import {v1} from 'uuid';
import {
    addFilterACType,
    addTodoListAC,
    removeTodoListAC,
    TodoListReducer,
    updateTodoListAC,
    updateTodoListACType
} from './TodoListReducer';
import {FilterType, TodoListStateType} from "../features/TodolistsList/TodolistsList";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListStateType>
let newTodolistTitle: string
let newTodolistId: string
let newFilter: FilterType

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    newTodolistId = v1();
    newTodolistTitle = "New Todolist"
    newFilter = "Completed"

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All",entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "All",entityStatus: 'idle'}
    ]
})

test.skip('correct todolist should be removed', () => {
    const endState = TodoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {


    const endState = TodoListReducer(startState, addTodoListAC(newTodolistTitle, 'todo-1'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test.skip('correct todolist should change its name', () => {

    const action: updateTodoListACType = {
        type: 'UPDATE_TODOLIST',
        todoListId: todolistId2,
        title: newTodolistTitle
    };

    const endState = TodoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test.skip('correct filter of todolist should be changed', () => {
    const action: addFilterACType = {
        type: 'ADD_FILTER',
        todoListId: todolistId2,
        filter: newFilter
    };

    const endState = TodoListReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
