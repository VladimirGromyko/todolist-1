import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "08f8988c-36d5-478a-8bca-6bc3626a17f4"
    }
})
export const taskApi = {
    getTasks(todolistId: string) {
        return instance.get<TaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return instance.put<CommonTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
    },
}
type taskItemsType = {
    "id": string,
    "title": string,
    "description": null | string,
    "todoListId": string,
    "order": number,
    "status": number,
    "priority": number,
    "startDate": null | string,
    "deadline": null | string,
    "addedDate": string
}
type TaskType = {
    error: null | string
    items: taskItemsType[]
    totalCount: number
}
type CommonTaskType = {
    data: { item: taskItemsType }
    resultCode: number
    messages: Array<string>
}

// type CommonTodoType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     fieldsError: Array<string>
//     data: D
// }
// Video 13 Time: 3:07:00