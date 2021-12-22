import React from "react";
import {RootReducersType, store} from "../../redux/store";
import App from "../../App";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../../redux/TaskReducer";
import {TodoListReducer} from "../../redux/TodoListReducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer
})

const initialGlobalState = {
    todoList: [
        {id: "todolistId1", title: "What to learn", filter: "All"},
        {id: "todolistId2", title: "What to buy", filter: "All"}
    ],
    task: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootReducersType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
