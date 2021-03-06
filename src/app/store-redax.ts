import {applyMiddleware, combineReducers} from "redux";
// import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducer, TasksReducerType} from "../redux/TaskReducer";
import {TodoListReducer, TodoListsReducerType} from "../redux/TodoListReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/Login/authReducer";
import {configureStore} from "@reduxjs/toolkit";

let rootReducers = combineReducers({
        todoList: TodoListReducer,
        task: TaskReducer,
        app: appReducer,
        auth: authReducer,
    }
)
export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppReducerType = TodoListsReducerType | TasksReducerType
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppReducerType>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

//with redux- toolkit
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store

