import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "../TodoList.module.css";

type EditableSpanPropsType = {
    isDone: boolean
    title: string
    callBackName: (title: string) => void
}

export const EditableSpan = ({isDone, title, callBackName}: EditableSpanPropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEdit(false)
            updateTitleTask()
        }
    }
    const editTrue = () => setEdit(true)

    const updateTitleTask = () => {
        let updateTitle = newTitle.trim()
        if (updateTitle) {
            callBackName(updateTitle)
        }
    }
    const editFalse = () => {
        setEdit(false)
        updateTitleTask()
    }
    return (

        edit
            ? <input value={newTitle}
                     onBlur={editFalse}
                     autoFocus
                     onChange={onChangeHandler}
                     onKeyPress={onKeyPressTaskHandler}

            />
            : <span className={isDone ? s.isDone : ''}
                    onDoubleClick={editTrue}>{title}
              </span>

    );
};
