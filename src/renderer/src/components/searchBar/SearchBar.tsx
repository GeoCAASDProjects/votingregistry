import { Search } from '@mui/icons-material'
import classes from './searchBar.module.css'

interface SearchFunc {
    (source: any): void;
}
interface SelectSearchFunc {
    (source?: any|null|undefined): void;
}
interface SearchBarI {
    style?: object,
    className?: string | null,
    value?: string,
    onChange?: SearchFunc,
    selectSearch?: SelectSearchFunc,
    searchList?: Array<object>,
    searchSelected?:boolean
}
export default function SearchBar({ style, className, value, searchSelected, searchList, selectSearch, onChange }: SearchBarI): JSX.Element {

 
    return (
        <>
            <div className={classes['search']} style={style}>

                <div className={classes['icon']}>
                    <Search />
                </div>
                <input placeholder="Buscar" value={value} onChange={onChange}></input>

                {       !searchSelected &&  !!searchList && value && value.length>0 && searchList?.length > 0 && <div className={classes["result-container"]}>

                    {
               searchList?.map((location) =>
                        (<div onClick={()=>selectSearch(location)} className={classes["result-container-element"]}>
                            {location?.name}
                        </div>
                        )
                        )
                    }
                </div>}
            </div>


        </>

    )

}