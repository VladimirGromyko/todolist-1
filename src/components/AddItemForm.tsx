import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {RequestStatusType} from "../app/app-reducer";
import {AddBox} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import IconButton from "@mui/material/IconButton";


type AddItemFormPropsType = {
    addTask: (title: string) => void
    entityStatus?: RequestStatusType
}
export const AddItemForm = React.memo(({addTask, entityStatus, ...props}: AddItemFormPropsType) => {
    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | boolean>('Title is required')

    const addTaskHandler = () => {
        let trimNewTitle = newTitle.trim()
        if (trimNewTitle && trimNewTitle.length < 180) {
            addTask(trimNewTitle)
            setNewTitle('')
            setError('Title is required')
        } else if (trimNewTitle.length > 180) {
        } else {
            setError('Title is required')
            setNewTitle('')
        }
    }
    const onChangeTaskHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)

        if (e.currentTarget.value.trim().length < 1) {
            setError('No title! Please enter title')
        } else if (newTitle.trim().length >= 180) {
            setError('Title is too long')
        } else {
            setError(false)
        }
    }
    const onKeyPressTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTitle.trim().length < 180) {
                addTaskHandler()
                setNewTitle('')
                setError('Title is required')
            }
        }
    }

    return (<div>
        <TextField variant='outlined'
                   size='small'
                   error={!!error}
                   value={newTitle}
                   onChange={onChangeTaskHandler}
                   onKeyPress={onKeyPressTaskHandler}
                   label='Title'
                   helperText={error}
                   disabled={entityStatus === 'loading'}

        />
        <span onClick={addTaskHandler}>
            <IconButton color='primary'
                        disabled={entityStatus === 'loading'}>
                <AddBox/>
            </IconButton>
        </span>

    </div>)
})
