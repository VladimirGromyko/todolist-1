import axios, {AxiosResponse} from "axios";
import {ResponseType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "08f8988c-36d5-478a-8bca-6bc3626a17f4"
    }
})
export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<ServerTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<{ title: string }, AxiosResponse<ResponseType<{ item: TaskItemsType }>>>
        (`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<{ model: UpdateTaskModelType }, AxiosResponse<ResponseType<{ item: TaskItemsType }>>>
        (`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
}
export type TaskItemsType = {
    "id": string,
    "title": string,
    "description": string,
    "todoListId": string,
    "order": number,
    "status": TaskStatuses
    "priority": TaskPriorities,
    "startDate": string,
    "deadline": string,
    "addedDate": string
}
export type ServerTaskType = {
    error: null | string
    items: TaskItemsType[]
    totalCount: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type UpdateTaskModelType = {
    title: string
    description: string
    //completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

// type CommonTodoType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsError: Array<string>
//     data: D
// }
// Video 13 Time: 3:07:00