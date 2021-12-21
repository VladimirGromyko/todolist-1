import {v1} from 'uuid';
import {TasksStateType} from '../App';

import {addTodoListACType, removeTodoListACType} from './TodoListReducer';


let initialTasks: TasksStateType = {
   /* [todoLists1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Python", isDone: false},
        {id: v1(), title: "С#", isDone: false}
    ],
    [todoLists2]: [
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Milk", isDone: false},
        {id: v1(), title: "Oil", isDone: false},
        {id: v1(), title: "Butter", isDone: true},
        {id: v1(), title: "Meat", isDone: true}
    ]*/
}

export const TaskReducer = (state = initialTasks, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            // if (action.id) {
                const newTask = state[action.todoListId].filter(el => el.id !== action.id)
                return {...state, [action.todoListId]: newTask}
            // } else {
            //     delete state[action.todoListId]
            //     return {...state}
            // }
        }
        case 'ADD_TASK': {
            // if (action.title) {
            let newTask = [{id: v1(), title: action.title, isDone: false}, ...state[action.todoListId]]
            return {...state, [action.todoListId]: newTask}
            // } else return {...state, [action.todoListId]: []}
        }
        case 'CHANGE_STATUS': {
            let newTask = state[action.todoListId].map(m => m.id === action.id ? {...m, isDone: action.status} : m)
            return {...state, [action.todoListId]: newTask}
        }
        case 'UPDATE_TASK': {
            let newTask = state[action.todoListId].map(m => m.id === action.id ? {...m, title: action.title} : m)
            return {...state, [action.todoListId]: newTask}
        }
        case 'ADD_TODOLIST': {
            return {...state, [action.todoListId]: []}
        }
        case 'REMOVE_TODOLIST': {
            let newState = {...state}
            delete newState[action.todoListId]
            return newState
        }

        default:
            return state

    }
}

type GeneralType = RemoveTaskACType
    | AddTaskACType
    | ChangeStatusACType
    | updateTaskACType
    | addTodoListACType
    | removeTodoListACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>

export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE_TASK', todoListId, id
    } as const
}
export const addTaskAC = (todoListId: string, title: string) => {
    return {
        type: 'ADD_TASK', todoListId, title
    } as const
}
export const changeStatusAC = (todoListId: string, id: string, status: boolean) => {
    return {
        type: 'CHANGE_STATUS', todoListId, id, status
    } as const
}
export const updateTaskAC = (todoListId: string, id: string, title: string) => {
    return {
        type: 'UPDATE_TASK', todoListId, id, title
    } as const
}
