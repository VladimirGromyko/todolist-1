import { TasksStateType, TodoListsTitleType } from "../App";
import { TaskReducer } from "./TaskReducer";
import { addTodoListAC, TodoListReducer } from "./TodoListReducer";


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodoListsTitleType> = [];

    const action = addTodoListAC("new todolist", 'todo-1');

    const endTasksState = TaskReducer(startTasksState, action)
    const endTodolistsState = TodoListReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListId);
    expect(idFromTodolists).toBe(action.todoListId);
});

