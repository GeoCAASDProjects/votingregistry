import { Search } from '@mui/icons-material'
import classes from './searchBar.module.css'
export default function SearchBar(style, className): JSX.Element{
    
    return(
        <div className={classes['search']} style={style.style}>
    <div style={{alignContent:"center", alignItems:"center"}}>

    </div>
       <div  className={classes['icon']}>
       <Search/>
       </div>
        <input placeholder="Buscar"></input>
        </div>   
    )

}