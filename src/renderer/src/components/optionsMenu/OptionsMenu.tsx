import { useEffect, useRef } from "react";
import classes from "./optionsMenu.module.css"
import DynamicIcon from "../dynamicIcon/DynamicIcon";

 
export default function OptionsMenu({menuVisible, toggleMenu, options, children}): JSX.Element {

    let menuRef= useRef(null);
 /* useEffect(()=>{
        let handler = (e)=>{
       
          if(!menuRef.current.contains(e.target)){
      
          toggleMenu()
          }

        }
        if(menuVisible){
        document.addEventListener('click', handler)
        }else{
            document.removeEventListener("click", handler);
        }
         
        return() =>{
          document.removeEventListener("click", handler);
        }
     
      }, [menuVisible, toggleMenu]);*/

    return(
        <>
        {menuVisible &&  <div ref={menuRef} className={classes["comment-menu"]} style={{maxWidth: 300}}>
        {children}
        <div className={classes["menu-labels"]}>
      
        {options?.map((option, index) => (
       
          <div onClick={option.onClick}>
            {option.icon && <DynamicIcon iconName={option.icon} fontSize='inherit'/>}
            {option.label} 
            </div>
        )
      )}
        </div>
    </div>}
    </>
    )
}