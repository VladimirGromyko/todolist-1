import React, {useReducer} from 'react'
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import {addTaskAC, changeStatusAC, removeTaskAC, TaskReducer, updateTaskAC} from './redux/TaskReducer';
import {addFilterAC, addTodoListAC, removeTodoListAC, TodoListReducer, updateTodoListAC} from './redux/TodoListReducer';


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

    let todoLists1 = v1()
    let todoLists2 = v1()

    let initialTodolists: TodoListStateType = [
        {id: todoLists1, title: "What to learn", filter: 'All'},
        {id: todoLists2, title: "What to buy", filter: 'All'}
    ]
    const [todoLists, todoListsDispatch] = useReducer(TodoListReducer, initialTodolists)

    let initialTasks = {
        [todoLists1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Python", isDone: false},
            {id: v1(), title: "С#", isDone: false}
        ],
        [todoLists2]: [
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Oil", isDone: false},
            {id: v1(), title: "Butter", isDone: true},
            {id: v1(), title: "Meat", isDone: true}
        ]
    }

    const [tasks, taskDispatch] = useReducer(TaskReducer, initialTasks)

    const removeTask = (todoListId: string, id: string) => {
        taskDispatch(removeTaskAC(todoListId, id))
    }

    const addTask = (todoListId: string, title: string) => {
        let newTaskId = v1()
        if (title.trim()) {
            taskDispatch(addTaskAC(todoListId, newTaskId, title.trim()))
        }
    }
    const updateTask = (todoListId: string, id: string, title: string) => {
        taskDispatch(updateTaskAC(todoListId, id, title))
        //
        // let task = tasks[todoListId].map(m => m.id === id ? {...m, title} : m)
        // // setTask({...tasks, [todoListId]: task})
    }
    const addFilter = (todoListId: string, value: FilterType) => {
        todoListsDispatch(addFilterAC(todoListId, value))
    }
    const changeStatus = (todoListId: string, id: string, status: boolean) => {
        taskDispatch(changeStatusAC(todoListId, id, status))
    }
    const removeTodoList = (todoListId: string) => {
        todoListsDispatch(removeTodoListAC(todoListId))
        taskDispatch(removeTaskAC(todoListId, ''))
    }

    const updateTodoList = (todoListId: string, title: string) => {
        todoListsDispatch(updateTodoListAC(todoListId, title))
    }


    const addTodoList = (title: string) => {
        let newTodoListId = v1()
        let newTaskId = v1()
        todoListsDispatch(addTodoListAC(title, newTodoListId))
        taskDispatch(addTaskAC(newTodoListId, newTaskId, ''))
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
