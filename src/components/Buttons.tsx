import React from "react"
import s from './../components/Button.module.css'
import {FilterType} from "../app/App";
import Button from "@mui/material/Button";

type ButtonPropsType = {
    name: string
    filter: FilterType
    callBack: () => void

}
export const Buttons = ({name, callBack, filter, ...props}: ButtonPropsType) => {
    const onClickHandler = () => {
        callBack()
    }
    /*<button className={filter === name ? s.activeFilter : ''} onClick={onClickHandler}>{name}</button>*/
    return (
        <div style={{padding : "3px"}} className={s.buttonFilter}>
            <Button variant={filter === name ? "contained" : "outlined"}
                    size="small"
                    color={name === "Completed" ? "secondary" : (name === "Active" ? "success" : "primary")}
                    onClick={onClickHandler}>{name}
            </Button>
        </div>)
}