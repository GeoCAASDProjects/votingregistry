import { CircularProgress } from "@mui/material";
import { FC } from "react";
import classes from './button.module.css'
interface ButtonProps{
    title: string;
   
    isLoading: boolean;
    type: string;
    
}

const Button:FC<ButtonProps> = ({title, isLoading, type}) =>{
    return(
        <button type="submit" className={classes["button-container"]}>
        <div>
        {title}
        {isLoading && <CircularProgress size="16px" thickness={10} color="inherit"/>}
        </div>
        </button>
    )
}

export default Button;