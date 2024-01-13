export enum FilterType {
    ACTIVE = 'active',
    ALL = 'all',
    DONE = 'done'
}

export interface ITodolist {
    id: number,
    title: string,
    filter: FilterType
}

export interface TodolistProps {
    id: number,
    title: string,
    isTodolistLoading: boolean
}