import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducer, TasksReducerType} from "../redux/TaskReducer";
import {TodoListReducer, TodoListsReducerType} from "../redux/TodoListReducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../features/Login/authReducer";

let rootReducers = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer,
    app: appReducer,
    auth: authReducer,
    }
)
export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppReducerType = TodoListsReducerType | TasksReducerType
export type AppThunk <ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppReducerType>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

// https://www.youtube.com/watch?v=ce5CIHHfA4w&t=616s - 17 - redux-toolkit video: time: 38:17
// https://www.youtube.com/watch?v=9GjoRujbmuA - 18 - redux-toolkit video:
// https://www.youtube.com/watch?v=zRXlkm_RHaA - 19 - redux-toolkit video:
// https://www.youtube.com/watch?v=deSMEQgnL_A&t=2s - 19.2 - redux-toolkit video: