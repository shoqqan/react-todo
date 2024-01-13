import axios, {AxiosInstance, AxiosResponse} from "axios";
import {FilterType, ITodolist} from "../models/ITodolist.ts";
import {ChangeNameAPIResponce, MessageAPIResponce, TodolistAPIResponce} from "../models/api-responses.ts";

const instance = (): AxiosInstance => {
    const token = localStorage.getItem('token');
    if (token) {
        return axios.create(
            {
                baseURL: 'https://todo-back-production.up.railway.app/todolists',
                headers: {Authorization: `Bearer ${token}`}
            }
        )
    }else{
        window.location.reload()
    }

}

export const todolistAPI = {
    async getTodolists(): Promise<ITodolist[] | unknown> {
        try {
            const responce: AxiosResponse<TodolistAPIResponce[]> = await instance().get<TodolistAPIResponce[]>('')
            return responce.data.map(el => ({
                id: el.id,
                title: el.title,
                filter: FilterType.ALL
            }))
        } catch (error) {
            return error
        }
    },
    async createTodolist(title: string): Promise<ITodolist | unknown> {
        try {
            const responce: AxiosResponse<TodolistAPIResponce> = await instance().post<TodolistAPIResponce>('', {title})
            return {id: responce.data.id, title: responce.data.title, filter: FilterType.ALL}
        } catch (error) {
            return error
        }
    },
    async deleteTodolist(todo_id: number): Promise<number | unknown> {
        try {
            const responce: AxiosResponse<MessageAPIResponce> = await instance().delete<MessageAPIResponce>(`/${todo_id}`)
            return Number(responce.data.id)
        } catch (error) {
            return error
        }
    },
    async changeTodolistTitle(todo_id: number, title: string): Promise<{ todo_id: number, title: string } | unknown> {
        try {
            const responce: AxiosResponse<ChangeNameAPIResponce> = await instance().put<ChangeNameAPIResponce>(`/${todo_id}`, {title})
            return {todo_id, title: responce.data.title}
        } catch (error) {
            return error
        }
    }
}