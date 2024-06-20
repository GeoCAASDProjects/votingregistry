import { CircularProgress } from "@mui/material";
import { FC } from "react";
import classes from './button.module.css'
import DynamicIcon from "../dynamicIcon/DynamicIcon";
interface ButtonProps{
    title: string;
   
    isLoading: boolean;
    type: string;
    style: object;
    iconName: string
}

const Button:FC<ButtonProps> = ({title, isLoading, type, style, iconName}) =>{
    return(
        <button type="submit" style={style} className={classes["button-container"]}>
        <div >
        <DynamicIcon iconName={iconName}/>
        {title}
        {isLoading && <CircularProgress size="16px" thickness={10} color="inherit"/>}
        </div>
        </button>
    )
}

export default Button;