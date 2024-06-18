import { ArrowLeft, ArrowRight, More, Search } from "@mui/icons-material";
import { useState } from "react";
import classes from './sidebar.module.css'
import SearchBar from "../searchBar/SearchBar";
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar({ currentEnclosure }): JSX.Element {
    const [open, setOpen] = useState(true);

    return (
        <div style={{ 
            zIndex: 99999, 
            display: "flex", 
            position: "absolute", 
            top: 0, 
            left: open ? "0vw" : "-40vw",
            transition: ".4s ease-in-out",
     
            }}>
  <button className={classes["sidebar-toggle"]} onClick={()=>setOpen(prevValue=>!prevValue)}>
                    <MenuIcon/>
                </button>
            <div style={{ position: "relative" }}>
                
                <div

                    style={
                        {
                           
                           width: "40vw",
                            height: "100vh",
                            background: "#0F0F40",
                            color: "white",
                        
                            /*  borderRadius: "0 8px 8px 0",*/
                        }}>

                    <div style={{ padding: 10 }}>

                        <>
              
                        <h2>Contenedor</h2>
                        <SearchBar/>
                     
                        </>
                       
                        <h3>Recinto</h3>
                     {!!currentEnclosure && <table className={classes['table']}>
                            <thead>
                          
                               
                            </thead>
                            <tbody>
                            <tr>
                                   <td>Nombre</td>
                                   <td>{currentEnclosure.name}</td>
                      
                                </tr>
                                <tr>
                                   <td>Address</td>
                                   <td>{currentEnclosure.address}</td>
                      
                                </tr>
                                <tr>
                                <td>Longitude</td>
                                <td>{currentEnclosure.longitude}</td>
                      
                                </tr>
                                <tr>
                                <td>Latitude</td>
                                <td>{currentEnclosure.latitude}</td>
                                </tr>
                                <tr>
                                <td>Total de Escuelas</td>
                                <td>0</td>
                                </tr>
                     
                            </tbody>
                        </table>}
                    </div>

                </div>
              
            </div>
          
        </div>
    )
}
