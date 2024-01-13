import {TaskProps} from "../../models/ITask.ts";
import {useDispatch} from "react-redux";
import {changeTaskNameActionCreator, changeTaskStatus, deleteTask} from "../../state/reducers/task-reducer.ts";
import {ChangeEvent} from "react";
import {Editable} from "../Editable/Editable.tsx";

export const Task: React.FC<TaskProps> = ({todo_id, id, title, isDone}) => {
        const dispatch = useDispatch<any>()
        const deleteT = () => {
            dispatch(deleteTask(todo_id, id))
        }
        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatus(todo_id, id, event.currentTarget.checked))
        }
        const onChangeName = (title: string) => {
            dispatch(changeTaskNameActionCreator(todo_id, id, title))
        }

        return (
            <div className="w-full flex justify-between px-2 py-4">
                <div className="flex gap-3 border-b">
                    <Editable value={title} onChange={onChangeName}/>
                    <input onChange={onChangeHandler} checked={isDone} type="checkbox"/>
                </div>
                <button onClick={deleteT} className="w-6">
                    <svg height="20" viewBox="0 0 30 30" width="20" x="0px" xmlns="http://www.w3.org/2000/svg" y="0px">
                        <path
                            d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
                    </svg>
                </button>
            </div>
        );
    }
;

