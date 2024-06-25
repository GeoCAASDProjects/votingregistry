import { Search } from '@mui/icons-material'
import classes from './searchBar.module.css'
export default function SearchBar({style, className, value, onChange}): JSX.Element{
    
    return(
        <div className={classes['search']} style={style}>
    <div style={{alignContent:"center", alignItems:"center"}}>

    </div>
       <div  className={classes['icon']}>
       <Search/>
       </div>
        <input placeholder="Buscar" value={value} onChange={onChange}></input>
        </div>   
    )

}