// Video 10, time: 1:53.12



import React from 'react'
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {addTaskAC, changeStatusAC, removeTaskAC, updateTaskAC} from './redux/TaskReducer';
import {addFilterAC, addTodoListAC, removeTodoListAC, updateTodoListAC} from './redux/TodoListReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducersType} from './redux/store';

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
export type TodoListStateType = TodoListsTitleType[]

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function App() {
    let dispatch = useDispatch()
    let todoLists = useSelector<RootReducersType, TodoListStateType>(state => state.todoList)
    let tasks = useSelector<RootReducersType, TasksStateType>(state => state.task)

    const removeTask = (todoListId: string, id: string) => {
        dispatch(removeTaskAC(todoListId, id))
    }

    const addTask = (todoListId: string, title: string) => {
        if (title.trim()) {
            dispatch(addTaskAC(todoListId, title.trim()))
        }
    }
    const updateTask = (todoListId: string, id: string, title: string) => {
        dispatch(updateTaskAC(todoListId, id, title))
    }
    const addFilter = (todoListId: string, value: FilterType) => {
        dispatch(addFilterAC(todoListId, value))
    }
    const changeStatus = (todoListId: string, id: string, status: boolean) => {
        dispatch(changeStatusAC(todoListId, id, status))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }

    const updateTodoList = (todoListId: string, title: string) => {
        dispatch(updateTodoListAC(todoListId, title))
    }

    const addTodoList = (title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)

    }

    return (
        <div className="App">
            <AddItemForm addTask={addTodoList}/>
            {todoLists.map(m => {
                let newTask = tasks[m.id]
                if (m.filter === "Active") {
                    newTask = tasks[m.id].filter(t_el => !t_el.isDone)
                }
                if (m.filter === "Completed") {
                    newTask = tasks[m.id].filter(t_el => t_el.isDone)
                }
                return (
                    <TodoList
                        key={m.id}
                        todoListId={m.id}
                        title={m.title}
                        tasks={newTask}
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
