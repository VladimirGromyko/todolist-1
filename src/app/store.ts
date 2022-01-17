import {applyMiddleware, combineReducers, createStore} from "redux";
import { TaskReducer } from "../redux/TaskReducer";
import { TodoListReducer } from "../redux/TodoListReducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

let rootReducers = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer,
    app: appReducer
    }
)
export type RootReducersType = ReturnType<typeof rootReducers>
export const useAppSelector: TypedUseSelectorHook<RootReducersType> = useSelector

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

