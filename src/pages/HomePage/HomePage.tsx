import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createTodolist, getTodolists} from "../../state/reducers/todolist-reducer.ts";
import {setAuth} from "../../state/reducers/auth-reducer.ts";
import {AppStateType} from "../../state/store.ts";
import {ITodolist} from "../../models/ITodolist.ts";
import {Todolist} from "../../components/Todolist/Todolist.tsx";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm.tsx";
import {TodolistSkeleton} from "../../components/Todolist/TodolistSkeleton.tsx";

export const HomePage = () => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const dispatch = useDispatch<any>()
    const todolists = useSelector<AppStateType, ITodolist[]>(state => state.todolistReducer)
    const isLoading = useSelector<AppStateType, boolean>(state => state.appReducer.isLoading)
    const create = (title: string): void => {
        dispatch(createTodolist(title))
    }
    const onLogOut = () => {
        dispatch(setAuth(false))
        localStorage.removeItem('token')
        navigate('/sign-in')
    }
    console.log(isLoading)
    useEffect((): void => {
        if (!token) {
            onLogOut()
        }
        dispatch(getTodolists());
    }, [token])
    return (
        <div className={'w-screen h-screen overflow-hidden'}>
            <div className="flex justify-between px-4 py-4 border bg-[#FBFBFA]">
                <div className="flex flex-col gap-y-4">
                    <h1 className="font-bold text-2xl">New Todolist</h1>
                    <AddItemForm addItem={create} placeholder={'What to do?'}/>
                </div>
                <button onClick={onLogOut}
                        className="flex justify-center items-center gap-x-3 text-md cursor-pointer transition-all hover:text-[#2383e2] hover:gap-x-1">
                    <div className="w-6 flex justify-center items-center">
                        <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <g id="sr-longarrow-left">
                                <path clipRule="evenodd"
                                      d="M7.70711 6.29289C8.09763 6.68342 8.09763 7.31658 7.70711 7.70711L4.41421 11H22C22.5523 11 23 11.4477 23 12C23 12.5523 22.5523 13 22 13H4.41421L7.70711 16.2929C8.09763 16.6834 8.09763 17.3166 7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071L1.29289 12.7071C0.902369 12.3166 0.902369 11.6834 1.29289 11.2929L6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289Z"
                                      fill="#2383E2"
                                      fillRule="evenodd"
                                      id="line"/>
                            </g>
                        </svg>
                    </div>
                    <span>Log out</span>
                </button>
            </div>
            <div className={'flex gap-2 px-6 py-5 gap-x-5 flex-wrap'}>
                {isLoading && <>
                    <TodolistSkeleton/>
                    <TodolistSkeleton/>
                    <TodolistSkeleton/>
                    <TodolistSkeleton/>
                    <TodolistSkeleton/>
                </>}
                {!isLoading && todolists.map((el) => (
                    <Todolist key={el.id} id={el.id} title={el.title} isTodolistLoading={false}/>
                ))}

            </div>
        </div>
    );
};

