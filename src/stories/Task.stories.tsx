import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm} from "../components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {TaskType} from "../App";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
args: {
    removeTask: action("remove task"),
    changeStatus: action("change status"),
    updateTask: action("change title")
},
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    todoListId: '1',
    task: {
        id: '2',
        title: "JS",
        isDone: true
    },
    todoListTitle: "What to learn",
};

TaskIsNotDoneStory.args = {
    todoListId: '1',
    task: {
        id: '12',
        title: "React",
        isDone: false
    },
    todoListTitle: "What to learn",
};