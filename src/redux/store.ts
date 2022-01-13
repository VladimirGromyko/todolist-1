import {applyMiddleware, combineReducers, createStore} from "redux";
import { TaskReducer } from "./TaskReducer";
import { TodoListReducer } from "./TodoListReducer";
import thunkMiddleware from "redux-thunk";

let rootReducers = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer
    }
)
export type RootReducersType = ReturnType<typeof rootReducers>

export const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))

