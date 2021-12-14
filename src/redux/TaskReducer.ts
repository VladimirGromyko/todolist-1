import {TasksStateType} from '../App';

export const TaskReducer = (state: TasksStateType, action: GeneralType) => {
    switch (action.type) {
        case 'REMOVE_TASK': {
            if (action.id) {
                const newTask = state[action.todoListId].filter(el => el.id !== action.id)
                return {...state, [action.todoListId]: newTask}
            } else {
                delete state[action.todoListId]
                return {...state}
            }
        }
        case 'ADD_TASK': {
            if (action.title) {
                let newTask = [{id: action.id, title: action.title, isDone: false}, ...state[action.todoListId]]
                return {...state, [action.todoListId]: newTask}
            } else return {...state, [action.todoListId]: []}
        }
        case 'CHANGE_STATUS': {
            let newTask = state[action.todoListId].map(m => m.id === action.id ? {...m, isDone: action.status} : m)
            return {...state, [action.todoListId]: newTask}
        }
        case 'UPDATE_TASK': {
            let newTask = state[action.todoListId].map(m => m.id === action.id ? {...m, title:action.title} : m)
            return {...state, [action.todoListId]: newTask}
        }

        default:
            return state

    }
}

type GeneralType = RemoveTaskACType |
    AddTaskACType |
    ChangeStatusACType |
    updateTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>

export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE_TASK', todoListId, id
    } as const
}
export const addTaskAC = (todoListId: string, id:string, title: string) => {
    return {
        type: 'ADD_TASK', todoListId, id, title
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
