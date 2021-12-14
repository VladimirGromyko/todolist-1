import {FilterType, TodoListStateType, TodoListsTitleType} from '../App';


export const TodoListReducer = (state: TodoListStateType, action: GeneralType) => {
        switch (action.type) {
            case 'REMOVE_TODOLIST': {
                return state.filter(el => el.id !== action.todoListId)
            }
            case 'ADD_TODOLIST': {
                let newtodoList: TodoListsTitleType = {id: action.newTodoListId, title: action.title, filter: "All"}
                return [ newtodoList,...state]
            }
            case 'ADD_FILTER': {

                // setTodoLists(todoLists.map(m => m.id === todoListId ? {...m, filter: value} : m))
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

type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type addFilterACType = ReturnType<typeof addFilterAC>
type updateTodoListACType = ReturnType<typeof updateTodoListAC>

export const removeTodoListAC = (todoListId: string) => {
    return {
        type: 'REMOVE_TODOLIST', todoListId
    } as const
}
export const addTodoListAC = (title: string, newTodoListId: string) => {

    return {
        type: 'ADD_TODOLIST', title, newTodoListId
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
