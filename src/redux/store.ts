import {combineReducers, createStore} from "redux";
import { TaskReducer } from "./TaskReducer";
import { TodoListReducer } from "./TodoListReducer";

let rootReducers = combineReducers({
        task: TaskReducer,
        todoList: TodoListReducer
    }
)
export type RootReducersType = ReturnType<typeof rootReducers>

export let store = createStore(rootReducers)

