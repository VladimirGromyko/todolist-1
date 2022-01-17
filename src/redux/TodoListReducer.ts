import {FilterType, TodoListStateType} from '../app/App';
import {todolistApi, TodoType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RootReducersType} from "../app/store";
import {
    RequestStatusType,
    setAppErrorAC,
    setAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from "../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

let initialTodoLists: TodoListStateType[] = [
    /*{id: todoLists1, title: "What to learn", filter: 'All'},
    {id: todoLists2, title: "What to buy", filter: 'All'}*/
]

export const TodoListReducer = (state = initialTodoLists, action: GeneralType): TodoListStateType[] => {
    switch (action.type) {

        case 'SET_TODOLISTS': {
            let a: TodoListStateType[] = action.todos.map((tl) => {
                return {...tl, filter: 'All', entityStatus: 'idle'}
            })
            return a
        }
        case "TODOLIST/CHANGE_TODOLIST_ENTITY_STATUS": {
            return state.map(m => m.id === action.todoListId ? {...m, entityStatus: action.entityStatus} : m)
        }

        case 'REMOVE_TODOLIST': {
            return state.filter(el => el.id !== action.todoListId)
        }
        case 'ADD_TODOLIST': {
            let newtodoList: TodoListStateType = {
                id: action.todoListId,
                title: action.title, filter: "All", entityStatus: 'idle'
            }
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

type GeneralType = removeTodoListACType
    | addTodoListACType
    | addFilterACType
    | updateTodoListACType
    | setTodoListsACType
    | SetAppStatusACType
    | setAppErrorACType
    | changeTodolistEntityStatusACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type addFilterACType = ReturnType<typeof addFilterAC>
export type updateTodoListACType = ReturnType<typeof updateTodoListAC>
export type setTodoListsACType = ReturnType<typeof setTodoListsAC>
export type changeTodolistEntityStatusACType = ReturnType<typeof changeTodolistEntityStatusAC>

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
export const changeTodolistEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => {
    return {type: 'TODOLIST/CHANGE_TODOLIST_ENTITY_STATUS', todoListId, entityStatus} as const
}
export const fetchTodoListsTC = () =>
    (dispatch: Dispatch<GeneralType>, getState: () => RootReducersType): void => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.getTodos()
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setTodoListsAC(res.data))
            })
    }
export const addTodoListTC = (title: string) =>
    (dispatch: Dispatch<GeneralType>, getState: () => RootReducersType) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodo(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(addTodoListAC(title, res.data.data.item.id))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            })
    }
export const removeTodoListTC = (todolistId: string) =>
    (dispatch: Dispatch<GeneralType>, getState: () => RootReducersType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                if (res.data.resultCode ===0){
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(removeTodoListAC(todolistId))
                }else {
                    dispatch(setAppErrorAC( res.data.messages[0]))
                    dispatch(setAppStatusAC('failed'))
                }
            })
    }
export const updateTodoListTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch<GeneralType>, getState: () => RootReducersType) => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(updateTodoListAC(todolistId, title))
            })
    }