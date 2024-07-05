import { CircularProgress } from "@mui/material"
import classes from './dynamicLoader.module.css'
export default function DynamicLoader() {

    return (
        <div className={classes["loader"]}>
            <CircularProgress color="inherit" size={30} />
        </div>
    )
}