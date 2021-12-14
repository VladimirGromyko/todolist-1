import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType, TaskType} from "../App";

type FullInputPropsType = {
    addTask: (title: string) => void
}

export const FullInput: React.FC<FullInputPropsType>= ({addTask}) => {
    const [newTitle, setNewTitle] = useState('')
    const addTaskHandler = () => {
        addTask(newTitle)
        setNewTitle('')
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.ctrlKey) {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input onChange={onChangeTaskHandler}
                   onKeyPress={onKeyPressTaskHandler}
                   value={newTitle}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
    )
}