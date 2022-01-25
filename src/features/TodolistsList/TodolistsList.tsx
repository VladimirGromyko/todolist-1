import {TodoList} from "./Todolist/TodoList";
import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {addTaskTC, removeTaskTС, updateTaskTitleAndStatusTC} from "../../redux/TaskReducer";
import {
    addFilterAC,
    addTodoListTC,
    fetchTodoListsTC,
    removeTodoListTC,
    updateTodoListTC
} from "../../redux/TodoListReducer";
import {TaskItemsType, TaskStatuses} from "../../api/task-api";
import {AddItemForm} from "../../components/AddItemForm";
import {RequestStatusType} from "../../app/app-reducer";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import {Navigate} from "react-router-dom";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListsTitleType = {
    id: string,
    title: string,
}

export type TodoListStateType = TodoListsTitleType &
    {
        filter: FilterType
        entityStatus: RequestStatusType
    }
export type TasksStateType = {
    [key: string]: Array<TaskItemsType>
}

export const TodolistsList = () => {

    let dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    let todoLists = useSelector<AppRootStateType, TodoListStateType[]>(state => state.todoList)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.task)

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC())
    }, [dispatch, isLoggedIn])

    const removeTask = useCallback((todoListId: string, id: string) => {
        dispatch(removeTaskTС(todoListId, id))
    }, [dispatch])
    const addTask = useCallback((todoListId: string, title: string) => {
        if (title.trim()) {
            dispatch(addTaskTC(todoListId, title.trim()))
        }
    }, [dispatch])
    const updateTask = useCallback((todoListId: string, id: string, title: string) => {
        dispatch(updateTaskTitleAndStatusTC(todoListId, id, title))
    }, [dispatch])
    const addFilter = useCallback((todoListId: string, value: FilterType) => {
        dispatch(addFilterAC(todoListId, value))
    }, [dispatch])
    const changeStatus = useCallback((todoListId: string, id: string, status: TaskStatuses) => {
        dispatch(updateTaskTitleAndStatusTC(todoListId, id, status))
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [dispatch])
    const updateTodoList = useCallback((todoListId: string, title: string) => {
        dispatch(updateTodoListTC(todoListId, title))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <Grid container style={{padding : "20px"}}>
                <AddItemForm addTask={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map(m => {
                    return <Grid item key={m.id}>
                        <Paper style={{padding : "10px"}}>
                            <TodoList
                                /*key={m.id}*/
                                todoListId={m.id}
                                title={m.title}
                                entityStatus={m.entityStatus}
                                tasks={tasks[m.id]}
                                removeTask={removeTask}
                                addFilter={addFilter}
                                addTask={addTask}
                                changeStatus={changeStatus}
                                filter={m.filter}
                                removeTodoList={removeTodoList}
                                updateTask={updateTask}
                                updateTodoList={updateTodoList}
                            />
                        </Paper>
                    </Grid>
                })
                }
            </Grid>
        </div>
    )
}