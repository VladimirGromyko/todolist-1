import {FilterType, TodoListStateType, TodoListsTitleType} from '../App';
import {todolistApi, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RootReducersType} from "./store";

let initialTodoLists: TodoListStateType[] = [
    /*{id: todoLists1, title: "What to learn", filter: 'All'},
    {id: todoLists2, title: "What to buy", filter: 'All'}*/
]

export const TodoListReducer = (state = initialTodoLists, action: GeneralType): TodoListStateType[] => {
        switch (action.type) {

            case 'SET_TODOLISTS': {
                let a: TodoListStateType[] = action.todos.map((tl) => {
                    return {...tl, filter: 'All'}
                })
                return a
            }
            case 'REMOVE_TODOLIST': {
                return state.filter(el => el.id !== action.todoListId)
            }
            case 'ADD_TODOLIST': {
                let newtodoList: TodoListsTitleType = {id: action.todoListId, title: action.title, filter: "All"}
                return [newtodoList, ...state]
            }
            case 'ADD_FILTER': {
                return state.map(m => m.id === action.todoListId ? {...m, filter: action.filter} : m)
            }
            case 'UPDATE_TODOLIST': {
                return state.map(m => m.id === action.todoListId ? {...m, title: action.title} : m)
            }
            default:
                return state
        }
    }

type GeneralType = removeTodoListACType |
    addTodoListACType |
    addFilterACType |
    updateTodoListACType |
    setTodoListsACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type addFilterACType = ReturnType<typeof addFilterAC>
export type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export type setTodoListsACType = ReturnType<typeof setTodoListsAC>

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST', todoListId
    } as const
}
export const addTodoListAC = (title: string, todoListId: string) => {

    return {
        type: 'ADD_TODOLIST', title, todoListId
    } as const
}
export const addFilterAC = (todoListId: string, filter: FilterType) => {
    return {
        type: 'ADD_FILTER', todoListId, filter
    } as const
}
export const updateTodoListAC = (todoListId: string, title: string) => {
    return {
        type: 'UPDATE_TODOLIST', todoListId, title
    } as const
}
export const setTodoListsAC = (todos: Array<TodoType>) => {
    return {type: 'SET_TODOLISTS', todos} as const
}
export const fetchTodoListsTC = () => (dispatch: Dispatch, getState: () => RootReducersType): void => {
    todolistApi.getTodos()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch, getState: () => RootReducersType) => {
    todolistApi.createTodo(title)
        .then((res) => {
            dispatch(addTodoListAC(title, res.data.data.item.id))
        })
}
export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch, getState: () => RootReducersType) => {
    todolistApi.deleteTodo(todolistId)
        .then((res) => {
            dispatch(removeTodoListAC(todolistId))
        })
}
export const updateTodoListTC = (todolistId: string, title: string) => (dispatch: Dispatch, getState: () => RootReducersType) => {
    todolistApi.updateTodoTitle(todolistId, title)
        .then((res) => {
            dispatch(updateTodoListAC(todolistId, title))
        })
}