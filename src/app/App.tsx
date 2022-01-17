import React, {useCallback, useEffect} from 'react'
import './App.css';
import {TodoList} from "../TodoList";
import {AddItemForm} from "../components/AddItemForm";
import {addTaskTC, removeTaskTС, updateTaskTitleAndStatusTC} from '../redux/TaskReducer';
import {
    addFilterAC, addTodoListTC, fetchTodoListsTC,
    removeTodoListTC, updateTodoListTC
} from '../redux/TodoListReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducersType, useAppSelector} from './store';
import {TaskItemsType, TaskStatuses} from "../api/task-api";
import {RequestStatusType} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListsTitleType = {
    id: string,
    title: string,
    // filter: FilterType
}

export type TodoListStateType = TodoListsTitleType &
    {
        filter: FilterType
        entityStatus: RequestStatusType
    }
export type TasksStateType = {
    [key: string]: Array<TaskItemsType>
}

function App() {

    // const status = useSelector< RootReducersType, RequestStatusType>(state => state.app.status)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    let dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [dispatch])

    let todoLists = useSelector<RootReducersType, TodoListStateType[]>(state => state.todoList)
    let tasks = useSelector<RootReducersType, TasksStateType>(state => state.task)

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


    return (
        <div className="App">
            <LinearProgress/>
            {status === "loading" && <div className="linePreloader"></div>}


            <AddItemForm addTask={addTodoList}/>
            {todoLists.map(m => {
                return (
                    <TodoList
                        key={m.id}
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
                )
            })}
            <ErrorSnackbar/>
        </div>
    )
}

export default App;
