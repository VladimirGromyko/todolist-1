import {AxiosResponse} from "axios";
import {instance} from "./task-api";

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },
    createTodo(title: string) {
        return instance.post<ResponseType<{ item: TodoType }>,
            AxiosResponse<ResponseType<{ item: TodoType }>>, { title: string }>
        ('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>
        (`todo-lists/${todolistId}`, {title})
    },
}
export type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: D
}
// Video 13 Time: 3:07:00