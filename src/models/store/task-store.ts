import {ITask} from "../ITask.ts";

export interface GetTasks {
    type: "GET-TASKS",
    todo_id: number,
    tasks: ITask[]
}

export interface CreateTask {
    type: "CREATE-TASK",
    todo_id: number,
    task: ITask
}

export interface DeleteTask {
    type: "DELETE-TASK",
    todo_id: number,
    id: number
}

export interface ChangeTaskName {
    type: "CHANGE-TASK-NAME",
    todo_id: number,
    id: number,
    title: string
}

export interface ChangeTaskStatus {
    type: "CHANGE-TASK-STATUS",
    todo_id: number,
    id: number,
    isDone: boolean
}


export type TaskActionType =
    GetTasks |
    CreateTask |
    DeleteTask |
    ChangeTaskName |
    ChangeTaskStatus