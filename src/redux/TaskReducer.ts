import {TasksStateType, TaskType} from '../App';
import {addTodoListACType, removeTodoListACType, setTodoListsACType} from './TodoListReducer';
import {Dispatch} from "redux";
import {RootReducersType} from "./store";
import {taskApi, TaskItemsType, TaskPriorities, TaskStatuses, UpdateTaskModelType} from "../api/task-api";

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

export const TaskReducer = (state = initialTasks, action: GeneralType): TasksStateType => {
    switch (action.type) {
        case "SET_TASKS": {
            let newTasks: Array<TaskItemsType> = action.tasks.map(task => {
                let taskObject: TaskItemsType = {...task}
                return taskObject
            })
            return {...state, [action.todoListId]: newTasks}
        }
        case "SET_TODOLISTS": {
            let copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }
        case 'REMOVE_TASK': {
            const newTask = state[action.todoListId].filter(el => el.id !== action.id)
            return {...state, [action.todoListId]: newTask}
        }
        case 'ADD_TASK': {
            let newTask = [action.task, ...state[action.task.todoListId]]
            return {...state, [action.task.todoListId]: newTask}
        }
        case 'CHANGE_STATUS': {
            let newTask = state[action.todoListId].map(m => m.id === action.id ? {...m, status: action.status} : m)
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
    | setTodoListsACType
    | setTaskACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
type AddTaskACType = ReturnType<typeof addTaskAC>
type ChangeStatusACType = ReturnType<typeof changeStatusAC>
type updateTaskACType = ReturnType<typeof updateTaskAC>
type setTaskACType = ReturnType<typeof setTaskAC>

export const removeTaskAC = (todoListId: string, id: string) => {
    return {
        type: 'REMOVE_TASK', todoListId, id
    } as const
}
export const addTaskAC = (task: TaskItemsType) => {
    return {
        type: 'ADD_TASK', task
    } as const
}
export const changeStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE_STATUS', todoListId, id, status
    } as const
}
export const updateTaskAC = (todoListId: string, id: string, title: string) => {
    return {
        type: 'UPDATE_TASK', todoListId, id, title
    } as const
}
export const setTaskAC = (todoListId: string, tasks: TaskItemsType[]) => {
    return {type: 'SET_TASKS', todoListId, tasks} as const
}

export const fetchTasksTС = (todoListId: string) =>
    (dispatch: Dispatch, getState: () => RootReducersType): void => {
        taskApi.getTasks(todoListId)
            .then((res) => {
                dispatch(setTaskAC(todoListId, res.data.items))
            })
    }
export const removeTaskTС = (todoListId: string, taskId: string) =>
    (dispatch: Dispatch, getState: () => RootReducersType): void => {
        taskApi.deleteTask(todoListId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(todoListId, taskId))
                }
            })
    }
export const addTaskTC = (todolistId: string, title: string) =>
    (dispatch: Dispatch, getState: () => RootReducersType): void => {
        taskApi.createTask(todolistId, title)
            .then((res) => {
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
export const updateTaskTitleAndStatusTC = (todolistId: string, taskId: string,
                                           model: UpdateTaskModelType["status"]
                                               | UpdateTaskModelType["title"]) =>
    (dispatch: Dispatch, getState: () => RootReducersType): void => {
        const tasksForCurrentTodo = getState().task[todolistId]
        const currentTask = tasksForCurrentTodo.find((task) => task.id === taskId)
        if (currentTask) {
            let mod: UpdateTaskModelType
            if (typeof model !== 'string') {
                mod = {
                    title: currentTask.title,
                    description: currentTask.description,
                    status: model,
                    priority: currentTask.priority,
                    startDate: currentTask.startDate,
                    deadline: currentTask.deadline,
                }
            } else {
                mod = {
                    title: model,
                    description: currentTask.description,
                    status: currentTask.status,
                    priority: currentTask.priority,
                    startDate: currentTask.startDate,
                    deadline: currentTask.deadline,
                }
            }
            taskApi.updateTask(todolistId, taskId, mod)
                .then((res) => {
                    if (typeof model !== 'string') {
                        dispatch(changeStatusAC(todolistId, taskId, model))
                    } else {
                        dispatch(updateTaskAC(todolistId, taskId, model))
                    }
                })
        }
    }