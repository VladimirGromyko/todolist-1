import {TasksStateType} from '../app/App';
import {addTaskAC, changeStatusAC, removeTaskAC, TaskReducer, updateTaskAC} from './TaskReducer';
import {addTodoListAC, removeTodoListAC} from './TodoListReducer';
import {TaskPriorities, TaskStatuses} from "../api/task-api";

let startState: TasksStateType

beforeEach(() => {
    startState = {
        "todolistId1": [
            // {id: "1", title: "CSS", isDone: false},
            {
                "id": '1',
                "title": '"CSS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

            // {id: "2", title: "JS", isDone: true},
            {
                "id": '2',
                "title": '"JS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 2,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

            // {id: "3", title: "React", isDone: false}
            {
                "id": '3',
                "title": '"React"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

        ],
        "todolistId2": [
            // {id: "1", title: "bread", isDone: false},
            {
                "id": '1',
                "title": 'bread',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            // {id: "2", title: "milk", isDone: true},
            {
                "id": '2',
                "title": 'milk',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 2,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

            // {id: "3", title: "tea", isDone: false}
            {
                "id": '3',
                "title": 'tea',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC("todolistId2", "2");
    const endState = TaskReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                "id": '1',
                "title": '"CSS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": '2',
                "title": '"JS"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 2,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": '3',
                "title": '"React"',
                "description": '',
                "todoListId": 'todolistId1',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },

        ],
        "todolistId2": [
            {
                "id": '1',
                "title": 'bread',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
            {
                "id": '3',
                "title": 'tea',
                "description": '',
                "todoListId": 'todolistId2',
                "order": 0,
                "status": 0,
                "priority": 1,
                "startDate": '',
                "deadline": '',
                "addedDate": ''
            },
        ]
    })
})

test('correct task should be added to correct array', () => {

    const action = addTaskAC(
        {
            "id": "1212",
            "title": "juce",
            "description": '',
            "todoListId": "todolistId2",
            "order": 0,
            "status": 0,
            "priority": 1,
            "startDate": '',
            "deadline": '',
            "addedDate": ''
        })
    //"todolistId2", "juce",'1212');
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(0);
    // expect(endState["todolistId2"][0].isDone).toBe(false);
})

test('status of specified task should be changed', () => {
    const action = changeStatusAC("todolistId2", "2", 0);
    // const action = changeStatusAC("todolistId2", "2", false);
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(2);
    // expect(endState["todolistId1"][1].isDone).toBe(true);
    expect(endState["todolistId2"][1].status).toBe(0);
    // expect(endState["todolistId2"][1].isDone).toBe(false);
});

test('title of specified task should be changed', () => {
    const action = updateTaskAC("todolistId1", "2", "TS");
    const endState = TaskReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("TS");
    expect(endState["todolistId2"][1].title).toBe("milk");
});

test('new array should be added when new todolist is added', () => {
    const action = addTodoListAC("new todolist", 'todo-1');
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
