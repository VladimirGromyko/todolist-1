import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import App from "../app/App";
import {store} from "../app/store";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/App',
    component: App,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof App> = (args) =>
    // <App/>


    <Provider store={store}>
        <App/>
    </Provider>;

export const AppStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppStory.args = {};
