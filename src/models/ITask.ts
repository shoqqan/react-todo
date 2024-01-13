export interface ITask {
    id: number,
    title: string,
    isDone: boolean
}

export interface Tasks {
    [key: number]: ITask[]
}

export interface TaskProps {
    todo_id: number,
    id: number,
    title: string,
    isDone: boolean
}