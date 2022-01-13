import React, {useCallback, useEffect} from 'react'
import './App.css';
import {TodoList} from "./TodoList";
import {AddItemForm} from "./components/AddItemForm";
import {addTaskTC, removeTaskTС, updateTaskTitleAndStatusTC} from './redux/TaskReducer';
import {
    addFilterAC, addTodoListTC, fetchTodoListsTC,
    removeTodoListTC, updateTodoListTC
} from './redux/TodoListReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducersType} from './redux/store';
import {TaskItemsType, TaskStatuses} from "./api/task-api";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Active' | 'Completed'

export type TodoListsTitleType = {
    id: string,
    title: string,
    filter: FilterType
}

export type TodoListStateType = TodoListsTitleType &
    {
        filter: FilterType
    }
export type TasksStateType = {
    [key: string]: Array<TaskItemsType>
}

function App() {

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
            <AddItemForm addTask={addTodoList}/>
            {todoLists.map(m => {
                return (
                    <TodoList
                        key={m.id}
                        todoListId={m.id}
                        title={m.title}
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
        </div>
    )
}

export default App;
