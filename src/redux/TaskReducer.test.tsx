import { TasksStateType } from '../App';
import {addTaskAC, changeStatusAC, removeTaskAC, TaskReducer, updateTaskAC } from './TaskReducer';
import { addTodoListAC, removeTodoListAC } from './TodoListReducer';

let startState: TasksStateType

beforeEach(() => {
    startState =   {
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "2", title: "milk", isDone: true },
            { id: "3", title: "tea", isDone: false }
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2","2");
    const endState = TaskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC("todolistId2", "juce");
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeStatusAC("todolistId2", "2", false);
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC("todolistId1", "2", "TS");
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("TS");
    expect(endState["todolistId2"][1].title).toBe("milk");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist");
    const endState = TaskReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodoListAC("todolistId2");
    const endState = TaskReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});
