import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./components/EditableSpan";
import {TaskType} from "./App";

export type TaskPropsType = {
    todoListId: string,
    task: TaskType
    todoListTitle: string,
    removeTask: (todoListId: string, id: string) => void
    changeStatus: (todoListId: string, id: string, status: boolean) => void
    updateTask: (todoListId: string, id: string, title: string) => void
}

export const Task = React.memo(({
                                    todoListId, task, todoListTitle,
                                    removeTask, changeStatus, updateTask, ...props
                                }: TaskPropsType) => {

    const removeTaskHandler = useCallback(() => {
        removeTask(todoListId, task.id)
    }, [removeTask, todoListId])

    const onChangeCheckboxHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(todoListId, task.id, e.currentTarget.checked)
        }, [changeStatus, todoListId, task.id])

    const updateTaskHandler = useCallback((taskTitle: string) => {
        updateTask(todoListId, task.id, taskTitle)
    }, [updateTask, todoListId, task.id])

    return <div>
        <input type="checkbox"
               checked={task.isDone}
               onChange={onChangeCheckboxHandler}
        />
        <EditableSpan
            isDone={task.isDone}
            title={task.title}
            callBackName={updateTaskHandler}
        />
        <button onClick={removeTaskHandler}>X</button>
    </div>
})

