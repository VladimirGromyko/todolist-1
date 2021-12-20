import { v1 } from 'uuid';
import {FilterType, TodoListStateType, TodoListsTitleType } from '../App';



let initialTodoLists: TodoListStateType = [
    /*{id: todoLists1, title: "What to learn", filter: 'All'},
    {id: todoLists2, title: "What to buy", filter: 'All'}*/
]

export const TodoListReducer = (state=initialTodoLists, action: GeneralType) => {
        switch (action.type) {
            case 'REMOVE_TODOLIST': {
                return state.filter(el => el.id !== action.todoListId)
            }
            case 'ADD_TODOLIST': {
                // console.log("id:", action.todoListId, "title:", action.title)
                let newtodoList: TodoListsTitleType = {id: action.todoListId, title: action.title, filter: "All"}
                return [ newtodoList,...state]
            }
            case 'ADD_FILTER': {
                return state.map(m => m.id === action.todoListId ? {...m, filter: action.filter} : m)
            }
            case 'UPDATE_TODOLIST': {
                 return state.map(m=> m.id === action.todoListId ? {...m, title: action.title}:m)
            }
            default:
                return state

        }
    }
;

type GeneralType = removeTodoListACType |
    addTodoListACType |
    addFilterACType |
    updateTodoListACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type addFilterACType = ReturnType<typeof addFilterAC>
export type updateTodoListACType = ReturnType<typeof updateTodoListAC>

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST', todoListId
    } as const
}
export const addTodoListAC = (title: string) => {

    return {
        type: 'ADD_TODOLIST', title, todoListId: v1()
    } as const
}
export const addFilterAC = (todoListId: string, filter:FilterType) => {
    return {
        type: 'ADD_FILTER', todoListId, filter
    } as const
}
export const updateTodoListAC = (todoListId: string, title: string) => {
    return {
        type: 'UPDATE_TODOLIST', todoListId, title
    } as const
}
