import { CircularProgress } from "@mui/material";
import React, { FC } from "react";
import classes from './button.module.css'
import DynamicIcon from "../dynamicIcon/DynamicIcon";
interface ButtonProps{
    title?: string;
   
    isLoading?: boolean;
    type?: string;
    style?: object;
    iconName?: string|null;
    center?: boolean;
    children?: React.ReactNode;
    onClick?: (data:any) =>void;
    className?: string;
}

const Button:FC<ButtonProps> = ({title, isLoading, type, style, className, center, iconName, onClick, children}) =>{
    return(
        <button type="submit" style={style} className={`${classes["button-container"]} ${className}`} onClick={onClick} disabled={!!isLoading}>
        <div className={center ? classes["center"] : ""}>
        <DynamicIcon iconName={iconName ?? " "}/>
        {title}
        {children}
        {isLoading && <CircularProgress size="16px" thickness={10} color="inherit"/>}
        </div>
        </button>
    )
}

export default Button;