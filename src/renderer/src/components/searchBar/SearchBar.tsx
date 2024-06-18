import { Search } from '@mui/icons-material'
import classes from './searchBar.module.css'
export default function SearchBar(): JSX.Element{
    return(
        <div className={classes['search']}>
       <div  className={classes['icon']}>
       <Search/>
       </div>
        <input placeholder="Buscar"></input>
        </div>   
    )

}