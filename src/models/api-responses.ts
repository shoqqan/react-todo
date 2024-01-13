export interface TaskAPIResponce {
    id: number,
    title: string,
    isDone: boolean,
    todolist_id: number,
    createdAt: string,
    updatedAt: string
}

export interface TodolistAPIResponce {
    id: number,
    title: string,
    user_id: number,
    updatedAt: string,
    createdAt: string
}

export interface MessageAPIResponce {
    message: string,
    id: string
}

export interface ChangeNameAPIResponce {
    message: string,
    title: string
}

export interface CreateTodolistsAPIResponce {
    id: number,
    title: string,
    user_id: number,
    updatedAt: string,
    createdAt: string
}
export interface ErrorApiResponce {
    error: {
        message: string
    }
}

export interface TokenAPIResponce {
    token: string;
}
