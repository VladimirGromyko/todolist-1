import React, {useCallback, useEffect} from 'react'
import {FilterType} from "./app/App";
import {Buttons} from "./components/Buttons";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Task} from "./Task";
import {fetchTasksTС} from "./redux/TaskReducer";
import {useDispatch} from "react-redux";
import {TaskItemsType, TaskStatuses} from "./api/task-api";
import IconButton from '@mui/material/IconButton';
import Delete from '@material-ui/icons/Delete';
import {RequestStatusType} from "./app/app-reducer";


type TodoListPropsType = {
    todoListId: string
    title: string
    entityStatus: RequestStatusType
    tasks: Array<TaskItemsType>
    removeTask: (todoListId: string, id: string) => void
    addFilter: (todoListId: string, value: FilterType) => void
    addTask: (todoListId: string, title: string) => void
    changeStatus: (todoListId: string, id: string, status: TaskStatuses) => void
    filter: FilterType
    removeTodoList: (todoListId: string) => void
    updateTask: (todoListId: string, id: string, title: string) => void
    updateTodoList: (todoListId: string, title: string) => void
}
export const TodoList = React.memo(({
                                        todoListId, title, entityStatus, tasks, removeTask,
                                        addFilter, addTask, changeStatus, filter, removeTodoList,
                                        updateTask, updateTodoList, ...props
                                    }: TodoListPropsType) => {

    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchTasksTС(todoListId))
    }, [dispatch, todoListId])

    const removeTodoListHandler = useCallback((todoListId: string) => {
        removeTodoList(todoListId)
    }, [removeTodoList])

    const addTaskHandler = useCallback((title: string) => {
        addTask(todoListId, title)
    }, [addTask, todoListId])

    const updateTodoListHandler = useCallback(
        (todoListTitle: string) => {
            updateTodoList(todoListId, todoListTitle)
        }, [updateTodoList, todoListId])

    let newTask = tasks
    if (filter === "Active") {
        newTask = newTask.filter(t_el => !t_el.status)
    }
    if (filter === "Completed") {
        newTask = newTask.filter(t_el => t_el.status)
    }

    const addAllFilterTaskHandler = useCallback(() => {
        addFilter(todoListId, 'All')
    }, [addFilter, todoListId])
    const addActiveFilterTaskHandler = useCallback(() => {
        addFilter(todoListId, 'Active')
    }, [addFilter, todoListId])
    const addCompletedFilterTaskHandler = useCallback(() => {
        addFilter(todoListId, 'Completed')
    }, [addFilter, todoListId])


    const newTasks = newTask.map(el => {
        return (
            <Task key={el.id}
                  todoListId={todoListId}
                  task={el}
                  todoListTitle={title}
                  removeTask={removeTask}
                  changeStatus={changeStatus}
                  updateTask={updateTask}/>
        )
    })

    return (
        <div>
            <h3>
                <EditableSpan status={0}
                              title={title}
                              callBackName={updateTodoListHandler}/>

                <IconButton size="small"
                            onClick={() => removeTodoListHandler(todoListId)}
                            disabled={entityStatus === 'loading'}
                >
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addTask={addTaskHandler}
                         entityStatus={entityStatus}/>
            <div>
                {newTasks}
            </div>
            <div>
                <Buttons name={'All'} filter={filter} callBack={addAllFilterTaskHandler}/>
                <Buttons name={'Active'} filter={filter} callBack={addActiveFilterTaskHandler}/>
                <Buttons name={'Completed'} filter={filter} callBack={addCompletedFilterTaskHandler}/>
            </div>
        </div>
    )
})