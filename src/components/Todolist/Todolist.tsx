import * as React from "react";
import {useEffect, useState} from "react";
import {FilterType, TodolistProps} from "../../models/ITodolist.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../state/store.ts";
import {ITask} from "../../models/ITask.ts";
import {createTask, getTasks} from "../../state/reducers/task-reducer.ts";
import {Task} from "../Task/Task.tsx";
import {AddItemForm} from "../AddItemForm/AddItemForm.tsx";
import {changeTodolistTitle, deleteTodolist} from "../../state/reducers/todolist-reducer.ts";
import {Editable} from "../Editable/Editable.tsx";

export const Todolist: React.FC<TodolistProps> = ({id, title, isTodolistLoading}) => {
    const tasks: ITask[] = useSelector<AppStateType, ITask[]>(state => state.taskReducer[id])
    const dispatch = useDispatch<any>()
    const [filter, setFilter] = useState<FilterType>(FilterType.ALL)
    let tasksForTodolists = tasks
    if (filter == FilterType.DONE) {
        tasksForTodolists = tasks.filter(el => el.isDone)
    }
    if (filter == FilterType.ACTIVE) {
        tasksForTodolists = tasks.filter(el => !el.isDone)
    }
    const deleteTdl = (): void => {
        dispatch(deleteTodolist(id))
    }
    const onChangeTitle = (title: string): void => {
        dispatch(changeTodolistTitle(id, title))
    }
    const create = (title: string) => {
        dispatch(createTask(id, title))
    }
    useEffect((): void => {
        dispatch(getTasks(id))
    }, []);
    return (
        <div
            className="flex flex-col h-fit gap-2 bg-white border shadow-lg px-2 py-4 rounded-xl transition-all hover:scale-105">
            <div className="w-full flex justify-between">
                {/*<h1 onClick={() => {*/}
                {/*}} className="text-lg font-bold">{title}</h1>*/}
                <Editable value={title} onChange={onChangeTitle}/>
                <button onClick={deleteTdl} className="w-8">
                    <svg height="22" viewBox="0 0 24 24" width="22" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"></path>
                    </svg>
                </button>
            </div>
            <AddItemForm addItem={create} placeholder={'create task'}/>
            <div className="flex flex-col bg-white border rounded-2xl">
                {/*<TaskSkeleton isLoading={isLoading} />*/}
                {tasks && tasksForTodolists.map((task) => (
                    <Task
                        key={task.id}
                        id={task.id}
                        isDone={task.isDone}
                        title={task.title}
                        todo_id={id}
                    />
                ))}
            </div>
            <div className="w-full flex justify-evenly">
                <button
                    onClick={() => {
                        setFilter(FilterType.ALL)
                    }}
                    className={`px-4 py-2 border border-solid border-slate-400 rounded-lg ${filter === 'all' ? 'bg-blue-200' : ''}`}
                >
                    All
                </button>
                <button
                    onClick={() => {
                        setFilter(FilterType.ACTIVE)
                    }}
                    className={`px-4 py-2 border border-solid border-slate-400 rounded-lg ${filter === 'active' ? 'bg-blue-200' : ''}`}
                >
                    Active
                </button>
                <button
                    onClick={() => {
                        setFilter(FilterType.DONE)
                    }}
                    className={`px-4 py-2 border border-solid border-slate-400 rounded-lg ${filter === 'done' ? 'bg-blue-200' : ''}`}
                >
                    Done
                </button>
            </div>
        </div>
    );
};

