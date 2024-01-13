import {AppActions, AppStore, SetLoading} from "../../models/store/app-store.ts";

const initialState: AppStore = {
    isLoading: false
}
export const setLoadingActionCreator = (isLoading: boolean): SetLoading => (
    {type: "SET-LOADING", isLoading}
)
export const appReducer = (state: AppStore = initialState, action: AppActions):AppStore => {
    switch (action.type) {
        case "SET-LOADING": {
            return {...state, isLoading: action.isLoading}
        }
        default:{
            return state
        }
    }
}