export interface SetLoading {
    type: "SET-LOADING",
    isLoading: boolean
}

export interface AppStore {
    isLoading: boolean
}

export type AppActions = SetLoading