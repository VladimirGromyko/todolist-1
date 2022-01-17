import React from "react";
import {RootReducersType, store} from "../../app/store";
import App from "../../app/App";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {TaskReducer} from "../../redux/TaskReducer";
import {TodoListReducer} from "../../redux/TodoListReducer";
import {v1} from "uuid";
import {appReducer, RequestStatusType} from "../../app/app-reducer";

const rootReducer = combineReducers({
    todoList: TodoListReducer,
    task: TaskReducer,
    app: appReducer
})

const initialGlobalState = {
    todoList: [
        {id: "todolistId1", title: "What to learn", filter: "All", entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "All", entityStatus: 'idle'}
    ],
    task: {
        ["todolistId1"]: [
            {
                "id": v1(),
                "title": '"CSS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": v1(),
                "title": '"JS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 2,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": v1(),
                "title": '"React"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
        ],
        ["todolistId2"]: [
            {
                "id": v1(),
                "title": 'bread',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": v1(),
                "title": 'tea',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
        ]
    },
    app: {
        status: 'loading',
        isError: null,
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootReducersType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
