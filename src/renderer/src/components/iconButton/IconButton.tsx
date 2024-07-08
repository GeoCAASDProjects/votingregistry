import DynamicIcon from "../dynamicIcon/DynamicIcon";
import classes from './iconButton.module.css'
export default function IconButton({onClick,iconName}){
    return(
        <span className={classes["btn"]} onClick={onClick}>
       <DynamicIcon iconName={iconName}/>
        </span>
 
    )
}