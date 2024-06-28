import { Search } from '@mui/icons-material'
import classes from './searchBar.module.css'
import { useEffect, useState } from 'react';
import { object } from 'yup';

interface SearchFunc {
    (source: any): void;
}
interface SelectSearchFunc {
    (source?: any|null|undefined): void;
}
 
interface ISearchReturnObject{
    name?: string;
    geometry?: [number, number]
}
type SearchFuncType =(query:string)=>Promise<ISearchReturnObject[]> 

interface ISearchBar {
    style?: object,
    className?: string | null,
    selectSearch?: SelectSearchFunc,
    searchDataFunction?: SearchFuncType
}
export default function SearchBar({ style, className, selectSearch, searchDataFunction}: ISearchBar): JSX.Element {

    const[searchList, setSearchList] = useState<ISearchReturnObject[]>([]);
  
    const [searchValue, setSearchValue] = useState<string>('');
    
    const [searchTimeOut, setSearchTimeOut] = useState<NodeJS.Timeout | null>(null);
    const [searchSelected, setSearchSelected] = useState<boolean>(false);

    useEffect(() => {
   
        if (searchValue.length == 0) return;
        if (searchTimeOut !== null) {
          clearTimeout(searchTimeOut);
        }
    
    
        const timeoutId = setTimeout(async () => {
            const result = await searchDataFunction(searchValue);
           setSearchList(result)
    
        }, 500)
    
        setSearchTimeOut(timeoutId);
    
    
    
        return () => clearTimeout(timeoutId);
    
      }, [searchValue])

    function inputHandler(e) {
       
      setSearchSelected(false);
      setSearchValue(e.target.value);
    }
    function dataSelection(location){
        setSearchSelected(true);
        selectSearch(location);
    }
    return (
        <>
            <div className={classes['search']} style={style}>

                <div className={classes['icon']}>
                    <Search  />
                </div>
                <input placeholder="Buscar" value={searchValue} onChange={inputHandler}></input>

                {       !searchSelected &&  !!searchList && searchValue && searchValue.length>0 && searchList?.length > 0 && <div className={classes["result-container"]}>

                    {
               searchList?.map((location) =>
                        (<div onClick={()=>dataSelection(location)} className={classes["result-container-element"]}>
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