import {ITodolist} from "../ITodolist.ts";


export interface GetTodolists {
    type: "GET-TODOLISTS",
    todolists: ITodolist[]
}

export interface CreateTodolist {
    type: "CREATE-TODOLIST",
    todolist: ITodolist
}

export interface DeleteTodolist {
    type: "DELETE-TODOLIST",
    id: number
}

export interface ChangeTodolistTitle {
    type: "CHANGE-TITLE",
    todo_id: number,
    title: string
}

export type TodolistActionType =
    GetTodolists |
    CreateTodolist |
    DeleteTodolist |
    ChangeTodolistTitle