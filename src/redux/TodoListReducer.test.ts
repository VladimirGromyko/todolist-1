import {v1} from 'uuid';
import {FilterType, TodoListsTitleType} from '../App';
import {addFilterACType, addTodoListAC, removeTodoListAC, TodoListReducer, updateTodoListAC, updateTodoListACType } from './TodoListReducer';

test.skip('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListsTitleType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = TodoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test.skip('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";
    let newtodolistId = v1();

    const startState: Array<TodoListsTitleType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = TodoListReducer(startState, addTodoListAC(newTodolistTitle, newtodolistId))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test.skip('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListsTitleType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action:updateTodoListACType = {
        type: 'UPDATE_TODOLIST',
        todoListId: todolistId2,
        title: newTodolistTitle
    };

    const endState = TodoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterType = "Completed";

    const startState: Array<TodoListsTitleType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const action: addFilterACType = {
        type: 'ADD_FILTER',
        todoListId: todolistId2,
        filter: newFilter
    };

    const endState = TodoListReducer(startState, action);

    expect(endState[0].filter).toBe("All");
    expect(endState[1].filter).toBe(newFilter);
});
