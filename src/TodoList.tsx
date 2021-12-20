import React, {ChangeEvent} from 'react'
import {FilterType, TaskType} from "./App";
import {Button} from "./components/Button";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";


type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListId: string, id: string) => void
    addFilter: (todoListId: string, value: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, id: string, status: boolean) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, id: string, title:string) => void
    updateTodoList: (todoListId: string, title: string)=> void
}
export const TodoList = ({
                             todoListId, title, tasks, removeTask, addFilter,
                             addTask, changeStatus, filter, removeTodoList,
                             updateTask, updateTodoList,...props
                         }: TodoListPropsType) => {

    const addFilterTaskHandler = (todoListId: string, value: FilterType) => {
        addFilter(todoListId, value)
    }
    const removeTaskHandler = (todoListId: string, tId: string) => {
        removeTask(todoListId, tId)
    }
    const onChangeCheckboxHandler = (elId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeStatus(todoListId, elId, e.currentTarget.checked)
    }
    const removeTodoListHandler = (todoListId: string) => {
        removeTodoList(todoListId)
    }
    const addTaskHandler = (title: string) => {
        addTask(todoListId, title)
    }
    const updateTaskHandler=(id:string, taskTitle: string) => {
        updateTask(todoListId, id, taskTitle)
    }
    const updateTodoListHandler=(TodoListTitle: string) => {
        updateTodoList(todoListId, TodoListTitle)
    }

    return (
        <div>
            <h3>
                <EditableSpan isDone={false}
                              title={title}
                              callBackName={(title)=> updateTodoListHandler(title)}/>
                <button onClick={() => removeTodoListHandler(todoListId)}>X</button>
            </h3>
            <AddItemForm addTask={addTaskHandler}/>
            <div>
                {tasks.map(el => {
                    return (
                        <div key={el.id}>
                            <input type="checkbox"
                                   checked={el.isDone}
                                   onChange={(e) => onChangeCheckboxHandler(el.id, e)}
                            />
                            <EditableSpan
                                isDone={el.isDone}
                                title={el.title}
                                callBackName={(title)=> updateTaskHandler(el.id, title)}
                            />
                            <button onClick={() => removeTaskHandler(todoListId, el.id)}>X</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button name={'All'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'All')}/>
                <Button name={'Active'} filter={filter} callBack={() => addFilterTaskHandler(todoListId, 'Active')}/>
                <Button name={'Completed'} filter={filter}
                        callBack={() => addFilterTaskHandler(todoListId, 'Completed')}/>
            </div>
        </div>
    )
}