import {setAppErrorAC, setAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}
export const handleServerAppError  = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data:ResponseType<T>) => {
    dispatch(setAppErrorAC(data.messages.length ? data.messages[0] : 'some error'))
    dispatch(setAppStatusAC('failed'))
}
type ErrorUtilsDispatchType = SetAppStatusACType | setAppErrorACType