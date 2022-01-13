import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "./components/EditableSpan";
import {TaskItemsType, TaskStatuses} from "./api/task-api";

export type TaskPropsType = {
    todoListId: string,
    task: TaskItemsType
    // task: TaskType
    todoListTitle: string,
    removeTask: (todoListId: string, id: string) => void
    changeStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    // changeStatus: (todoListId: string, id: string, status: boolean) => void
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
            let status = e.currentTarget.checked ? TaskStatuses.Completed: TaskStatuses.New
            changeStatus(todoListId, task.id, status)
            // changeStatus(todoListId, task.id, e.currentTarget.checked)
        }, [changeStatus, todoListId, task.id])

    const updateTaskHandler = useCallback((taskTitle: string) => {
        updateTask(todoListId, task.id, taskTitle)
    }, [updateTask, todoListId, task.id])

    return <div>
        <input type="checkbox"
               checked={task.status === TaskStatuses.Completed}
               // checked={task.status > 0 ? true : false}
               // checked={task.isDone}
               onChange={onChangeCheckboxHandler}
        />
        <EditableSpan
            status={task.status}
            // isDone={task.isDone}
            title={task.title}
            callBackName={updateTaskHandler}
        />
        <button onClick={removeTaskHandler}>X</button>
    </div>
})

