import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {thunk} from "redux-thunk";
import {todolistReducer} from "./reducers/todolist-reducer.ts";
import {taskReducer} from "./reducers/task-reducer.ts";
import {authReducer} from "./reducers/auth-reducer.ts";
import {appReducer} from "./reducers/app-reducer.ts";

export type AppStateType = ReturnType<typeof rootReducers>
const rootReducers = combineReducers({
    todolistReducer,
    taskReducer,
    authReducer,
    appReducer
})
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)))