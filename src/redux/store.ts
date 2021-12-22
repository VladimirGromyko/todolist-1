import {combineReducers, createStore} from "redux";
import { TaskReducer } from "./TaskReducer";
import { TodoListReducer } from "./TodoListReducer";

let rootReducers = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer
    }
)
export type RootReducersType = ReturnType<typeof rootReducers>

export let store = createStore(rootReducers)

