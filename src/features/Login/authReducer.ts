import {Dispatch} from 'redux'
import {
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType,
    setIsInitializedAC,
    SetIsInitializedACType
} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {clearTodosDataAC, clearTodosDataACType} from "../../redux/TodoListReducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
// type InitialStateType = typeof initialState

//with redux toolkit conception
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value:boolean}>) {
            state.isLoggedIn = action.payload.value // immerjs
        }
    }
})
export const {setIsLoggedInAC} = slice.actions
export const authReducer = slice.reducer

// with redux conception
// export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'login/SET-IS-LOGGED-IN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
// actions
// export const setIsLoggedInAC = (value: boolean) => ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC({value:true}))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(clearTodosDataAC())
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
}

export const initializeAppTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC({value:true}))

            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
            handleServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })


}

// types
type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

type ActionsType =
    setIsLoggedInACType
    | SetAppStatusACType
    | SetAppErrorACType
    | SetIsInitializedACType
    | clearTodosDataACType
