import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API-Todos'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let title = 'What to watch'
        todolistApi.createTodo(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '3b12de54-8a1c-4dd9-b561-63842b789fa2'
        todolistApi.deleteTodo(todolistId)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'b3c9ac54-7d40-4015-9ef7-e678791d231b'
        const title = 'What to learn'
        todolistApi.updateTodoTitle(todolistId, title)
            .then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}