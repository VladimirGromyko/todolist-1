// Video 15,  time 3:17:50

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

// if status === "loading" - show Preloader
// if status === 'idle' | 'succeeded' | 'failed' - hide Preloader

const initialState = {
    status: 'idle' as RequestStatusType,
    isError: null as string | null
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return { ...state, isError: action.isError}
        default:
            return state
    }
}
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (isError: string | null) => ({type: 'APP/SET-ERROR', isError} as const)

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type setAppErrorACType = ReturnType<typeof setAppErrorAC>

type ActionsType = SetAppStatusACType
| setAppErrorACType
