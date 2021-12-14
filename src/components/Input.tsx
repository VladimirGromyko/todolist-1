import React, {ChangeEvent, KeyboardEvent} from 'react';
import s from './../TodoList.module.css'

type InputPropsType = {
    todoListId: string
    newTitle: string
    setNewTitle: (newTitle: string) => void
    addTask: (todoListId: string, title: string) => void
    setError: (error: string | boolean) => void
    error: string | boolean
}
export const Input = ({todoListId, newTitle, setNewTitle, addTask, setError, error, ...props}: InputPropsType) => {

    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

        if (e.currentTarget.value.trim().length < 1) {
            setError('No title! Please enter title')
        } else if (newTitle.trim().length >= 15) {
            setError('Title is too long')
        } else {
            setError(false)
        }
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        // if (e.ctrlKey) {
        if (e.key === 'Enter') {
            if (newTitle.trim().length < 15) {
                addTask(todoListId, newTitle)
                setNewTitle('')
                setError('Title is required')
            }
        }
    }

    return (
        <input value={newTitle}
               className={error ? s.error : s.nonError}
               onChange={onChangeTaskHandler}
               onKeyPress={onKeyPressTaskHandler}/>
    );
};
