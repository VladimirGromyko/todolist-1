export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// if status === "loading" - show Preloader
// if status === 'idle' | 'succeeded' | 'failed' - hide Preloader

const initialState = {
    status: 'idle' as RequestStatusType,
    isError: null as string | null,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-INITIALIZE":
            return {...state, isInitialized: action.isInitialized}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, isError: action.isError}
        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (isError: string | null) => ({type: 'APP/SET-ERROR', isError} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZE', isInitialized} as const)


export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>

type ActionsType =
    SetAppStatusACType
    | SetAppErrorACType
    | SetIsInitializedACType
