import React, {useEffect, useState} from 'react'
import {taskApi} from "../api/task-api";

export default {
    title: 'API-Tasks'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dbd2f43f-0c1c-49c8-ba66-002dc4ef1a8d'
        taskApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = 'dbd2f43f-0c1c-49c8-ba66-002dc4ef1a8d'
        let title = 'The Butterfly Effect'
        taskApi.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dbd2f43f-0c1c-49c8-ba66-002dc4ef1a8d'
        const taskId = '594630e1-1ea0-4d8d-a42a-e48ebe3760d9'
        taskApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'dbd2f43f-0c1c-49c8-ba66-002dc4ef1a8d'
        const taskId = 'd8d594bc-6096-42a6-8b3c-9d6fbac9964b'
        const title = 'Men in Black'
        taskApi.updateTaskTitle(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}