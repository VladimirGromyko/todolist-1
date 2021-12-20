import React from "react"
import s from './../TodoList.module.css'
import {FilterType} from "../App";

type ButtonPropsType = {
    name: string
    filter: FilterType
    callBack: () => void

}
export const Button = ({name, callBack, filter, ...props}: ButtonPropsType) => {
    const onClickHandler = () => {
        callBack()
    }
    return <button className={filter===name ? s.activeFilter : ''} onClick={onClickHandler}>{name}</button>
}