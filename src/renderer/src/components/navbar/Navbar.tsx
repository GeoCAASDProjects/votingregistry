import { useState } from 'react'
import classes from "./navbar.module.css"
import { ArrowDownward, ExpandMore, Notifications, Search } from '@mui/icons-material'
import { AppBar } from '@mui/material'
import { useAuth } from '@renderer/util/context/AuthContext'
import OptionsMenu from '../optionsMenu/OptionsMenu'
import { logout } from '@renderer/util/http/auth'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar(): JSX.Element {
  const authCtx = useAuth();
  const user = authCtx.user;
  const navigate = useNavigate();

  const [menuVisibile, setMenuVisible] = useState(false);

  function toggleMenu() {
    setMenuVisible((prevValue) => !prevValue);

  }
  async function onLogout() {
    try {
      const response = await logout();

      localStorage.removeItem("token");
      navigate("/login");
    } catch (e) {
      console.log("error")
    }
  }
  return (
    <>
      {localStorage.getItem('token') && <div className={classes["navbar"]}>
        <div className={classes["logo"]}>
          <img src="logo.svg" alt="" />
          <span>Registro de Votos</span>
        </div>
        <ul className={classes["link-list"]}>

          <li> <Link to="./">Mapa de Recintos</Link></li>
          <li><Link to="./schools">Colegios</Link></li>
          <li><Link to="./people">Personas</Link></li>
          <li><Link to="./users">Usuarios</Link></li>
          <li><Link to="./">Admin</Link></li>
        </ul>
        <div className={classes["icons"]}>
          { /*   <Search  className={classes['icon']}/>*/}
          <AppBar className={classes['icon']} />


          <div className={classes["notification"]}>
            <Notifications />
            <span>1</span>
          </div>

          <div style={{ display: "flex", gap: "4px" }}>

            <span>

              {!!user ? `${user?.name} ${user?.last_name}` : "Usuario"}
            </span>
            <div className={classes["user"]} style={{ display: "flex", gap: "4px", justifyContent: "flex-end", position: "relative" }}>
              <img src="https://thispersondoesnotexist.com/" alt="" />
              <div style={{ alignContent: "center", alignItems: "center" }} onClick={toggleMenu}>

                <ExpandMore />
              </div>
              <OptionsMenu toggleMenu={toggleMenu} menuVisible={menuVisibile}
                options={[

                  { label: "Opciones", icon: "Settings" },
                  { label: "Salir", icon: "Logout", onClick: onLogout }
                ]}
              >

              </OptionsMenu>


            </div>
          </div>


        </div>
      </div>}
    </>
  )
}


