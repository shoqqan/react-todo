import {SetAuth} from "../../models/store/auth-store.ts";

const initialState = false;
export const setAuth = (isAuth: boolean): SetAuth => ({
    type: "SET-AUTH", auth: isAuth
})
export const authReducer = (state: boolean = initialState, action: SetAuth) => {
    switch (action.type) {
        case "SET-AUTH":
            return action.auth
        default:
            return state
    }
}