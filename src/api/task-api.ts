import axios, {AxiosInstance} from "axios";
import {MessageAPIResponce, TaskAPIResponce} from "../models/api-responses.ts";
import {ITask} from "../models/ITask.ts";

const instance = (): AxiosInstance => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/sign-in'
    }
    return axios.create(
        {
            baseURL: 'https://todo-back-production.up.railway.app/todolists',
            headers: {Authorization: `Bearer ${token}`}
        }
    )
}

export const taskAPI = {
    async getTasksOfTodolist(todo_id: number): Promise<ITask[] | unknown> {
        try {
            const tasks = await instance().get<TaskAPIResponce[]>(`/${todo_id}/tasks`)
            return tasks.data.map((el: TaskAPIResponce) => ({
                id: el.id,
                title: el.title,
                isDone: el.isDone
            })).reverse()
        } catch (error) {
            return error
        }
    },
    async createTask(todo_id: number, title: string): Promise<ITask | unknown> {
        try {
            const task = await instance().post<TaskAPIResponce>(`/${todo_id}/tasks`, {title})
            return {id: task.data.id, title: task.data.title, isDone: task.data.isDone}
        } catch (error) {
            return error
        }
    },
    async deleteTask(todo_id: number, id: number): Promise<number | unknown> {
        try {
            const responce = await instance().delete<MessageAPIResponce>(`/${todo_id}/tasks/${id}`)
            return Number(responce.data.id)
        } catch (error) {
            return error
        }
    }
}