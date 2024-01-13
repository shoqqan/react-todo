import {ChangeTaskName, CreateTask, DeleteTask, GetTasks, TaskActionType} from "../../models/store/task-store.ts";
import {ITask, Tasks} from "../../models/ITask.ts";
import {Dispatch} from "redux";
import {taskAPI} from "../../api/task-api.ts";
import {setLoadingActionCreator} from "./app-reducer.ts";

const getTaskActionCreator = (todo_id: number, tasks: ITask[]): GetTasks => (
    {type: "GET-TASKS", todo_id, tasks}
)

const createTaskActionCreator = (todo_id: number, task: ITask): CreateTask => (
    {type: "CREATE-TASK", todo_id, task}
)
const deleteTaskActionCreator = (todo_id: number, id: number): DeleteTask => (
    {type: "DELETE-TASK", todo_id, id}
)
export const changeTaskNameActionCreator = (todo_id: number, id: number, title: string): ChangeTaskName => (
    {type: "CHANGE-TASK-NAME", todo_id, id, title}
)
export const changeTaskStatus = (todo_id: number, id: number, isDone: boolean) => (
    {type: "CHANGE-TASK-STATUS", todo_id, id, isDone}
)
export const getTasks = (todo_id: number) => async (dispatch: Dispatch) => {
    try {
        // dispatch(setLoadingActionCreator(true))
        const tasks = await taskAPI.getTasksOfTodolist(todo_id)
        dispatch(getTaskActionCreator(todo_id, tasks))
    } catch (error) {
        console.log(error)
    }finally {
        dispatch(setLoadingActionCreator(false))

    }
}
export const createTask = (todo_id: number, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingActionCreator(true))
        const task = await taskAPI.createTask(todo_id, title)
        dispatch(createTaskActionCreator(todo_id, task))
    } catch (error) {
        console.log(error)
    }
    finally {
        dispatch(setLoadingActionCreator(false))
    }
}

export const deleteTask = (todo_id: number, id: number) => async (dispatch: Dispatch) => {
    try {
        // dispatch(setLoadingActionCreator(true))
        const deletedID = await taskAPI.deleteTask(todo_id, id)
        dispatch(deleteTaskActionCreator(todo_id, deletedID));
    } catch (error) {
        console.log(error)
    }
    finally {
        // dispatch(setLoadingActionCreator(false))
    }
}
const initialState: Tasks = {}

export const taskReducer = (state: Tasks = initialState, action: TaskActionType) => {
    switch (action.type) {
        case "GET-TASKS": {
            return {...state, [action.todo_id]: action.tasks};
        }
        case "CREATE-TASK": {
            return {...state, [action.todo_id]: [...state[action.todo_id], action.task]}
        }
        case "DELETE-TASK": {
            return {...state, [action.todo_id]: state[action.todo_id].filter(el => el.id != action.id)}
        }
        case "CHANGE-TASK-NAME": {
            return {
                ...state,
                [action.todo_id]: state[action.todo_id].map((el) => (el.id === action.id ? {
                    ...el,
                    title: action.title
                } : {...el}))
            }
        }
        case "CHANGE-TASK-STATUS":{
            return {
                ...state,
                [action.todo_id]: state[action.todo_id].map((el)=>(el.id===action.id?{...el,isDone:action.isDone}:{...el}))
            }
        }
        default:
            return state
    }
}
