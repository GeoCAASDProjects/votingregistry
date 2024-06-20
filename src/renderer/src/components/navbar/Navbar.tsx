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
    { /*   <Search  className={classes['icon']}/>*/}
        <AppBar className={classes['icon']}/>
      
        <div className={classes["notification"]}>
          <Notifications/>
            <span>1</span>
        </div>

     <div style={{display:"flex", gap:"4px"}}>

     <span>

{!!user ? `${user?.name} ${user?.last_name}` : "Usuario"}
</span>
<div className={classes["user"]}>
<img src="https://thispersondoesnotexist.com/" alt=""/>
<div style={{position:"absolute", background:"red", zIndex: 99999, top: 30, boxSizing:"border-box", overflow:"auto"}}>
  <p>Optdddddddddddddddddddion</p>
  <p>Edit</p>
  <p>Logout</p>

</div>
</div>
     </div>

     
    </div>
    </div>}
   </>
  )
}


