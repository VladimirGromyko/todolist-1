import {instance} from "./task-api";
import {AxiosResponse} from "axios";
import {ResponseType} from "./todolist-api";

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    captcha?: string
}
export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>
        (`auth/login/`, data)
    },
    me() {
        return instance.get<ResponseType<MeResponseType>>('auth/me')
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login/`,)
    },
}
type MeResponseType = {
    id: number,
    email: string,
    login: string
}
// export type AuthMeResponseType = {
//     resultCode: number
//     messages: string[],
//     data: AuthMeDataResponseType
// }