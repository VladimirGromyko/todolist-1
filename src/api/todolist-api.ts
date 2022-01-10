import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "08f8988c-36d5-478a-8bca-6bc3626a17f4"
    }
})
export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists',)
    },
    createTodo(title: string) {
        return instance.post<CommonTodoType<{ item: TodoType }>,
            AxiosResponse<CommonTodoType<{ item: TodoType }>>, { title: string }>
        ('todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonTodoType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonTodoType, AxiosResponse<CommonTodoType>, { title: string }>
        (`todo-lists/${todolistId}`, {title})
    },
}
type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CommonTodoType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsError: Array<string>
    data: D
}
// Video 13 Time: 3:07:00