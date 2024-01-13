import {
    ChangeTodolistTitle,
    CreateTodolist,
    DeleteTodolist,
    GetTodolists,
    TodolistActionType
} from "../../models/store/todolist-store.ts";
import {ITodolist} from "../../models/ITodolist.ts";
import {Dispatch} from "redux";
import {todolistAPI} from "../../api/todolist-api.ts";
import {getTasks} from "./task-reducer.ts";
import {setLoadingActionCreator} from "./app-reducer.ts";

const initialState: ITodolist[] = []

const getTodolistActionCreator = (todolists: ITodolist[]): GetTodolists => (
    {type: "GET-TODOLISTS", todolists}
)
const createTodolistActionCreator = (todolist: ITodolist): CreateTodolist => (
    {type: "CREATE-TODOLIST", todolist}
)
const deleteTodolistActionCreator = (id: number): DeleteTodolist => (
    {type: "DELETE-TODOLIST", id}
)
const changeTodolistTitleActionCreator = (todo_id: number, title: string): ChangeTodolistTitle => ({
    type: "CHANGE-TITLE", todo_id, title
})
export const getTodolists = () => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingActionCreator(true))
        const todolists = await todolistAPI.getTodolists()
        dispatch(getTodolistActionCreator(todolists));
        todolists.map((el) => {
            dispatch(getTasks(el.id))
        })
    } catch (error) {
        console.log(error)
    }
    finally {
        // dispatch(setLoadingActionCreator(false))

    }
}

export const createTodolist = (title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingActionCreator(true))
        const newTodolist = await todolistAPI.createTodolist(title)
        dispatch(createTodolistActionCreator(newTodolist))
    } catch (error) {

    }
    finally {
        dispatch(setLoadingActionCreator(false))

    }
}
export const deleteTodolist = (id: number) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingActionCreator(true))
        const idOfDeleted = await todolistAPI.deleteTodolist(id)
        dispatch(deleteTodolistActionCreator(idOfDeleted))
    } catch (error) {

    }
    finally {
        dispatch(setLoadingActionCreator(false))
    }
}
export const changeTodolistTitle = (todo_id: number, title: string) => async (dispatch: Dispatch) => {
    try {
        const responce = await todolistAPI.changeTodolistTitle(todo_id, title)
        dispatch(changeTodolistTitleActionCreator(responce.todo_id, responce.title))
    } catch (error) {

    }
}
export const todolistReducer = (state: ITodolist[] = initialState, action: TodolistActionType) => {
    switch (action.type) {
        case "GET-TODOLISTS": {
            return action.todolists
        }
        case "CREATE-TODOLIST": {
            return [...state, action.todolist]
        }
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id != action.id)
        }
        default:
            return state
    }
}
