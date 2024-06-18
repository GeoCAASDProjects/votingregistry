import { useState } from 'react'
import classes from "./navbar.module.css"
import { Notifications, Search } from '@mui/icons-material'
import { AppBar } from '@mui/material'
import { useAuth } from '@renderer/util/context/AuthContext'
export default function Navbar(): JSX.Element {

  const authCtx = useAuth();
  const user = authCtx.user;
  console.log(user);
  return(
   <>
{localStorage.getItem('token')  &&  <div className={classes["navbar"]}>
    <div className={classes["logo"]}>
        <img src="logo.svg" alt=""/>
        <span>Registro de Votos</span>
    </div>

    <div className={classes["icons"]}>
        <Search  className={classes['icon']}/>
        <AppBar className={classes['icon']}/>
      
        <div className={classes["notification"]}>
          <Notifications/>
            <span>1</span>
        </div>
        <div className={classes["user"]}>
       
        </div>
     
        <span>{!!user ? `${user?.name} ${user?.last_name}` : "Usuario"}</span>
        <img src="/logout.svg" alt="" className="icon"/>
    </div>
    </div>}
   </>
  )
}


