import { ArrowLeft, ArrowRight, Search } from "@mui/icons-material";
import { useState } from "react";
import classes from './sidebar.module.css'
import SearchBar from "../searchBar/SearchBar";
export default function Sidebar({ currentEnclosure }): JSX.Element {
    const [open, setOpen] = useState(true);

    return (
        <div style={{ zIndex: 99999, display: "flex", position: "absolute", top: 0, left: 0 }}>
            <div style={{ position: "relative" }}>
                <div

                    style={
                        {
                            height: "100vh",
                            maxWidth: open ? "350px" : 40,
                            background: "#0F0F40", color: "white",
                            transition: ".4s ease-in-out",
                            overflowY: "auto",
                            /*  borderRadius: "0 8px 8px 0",*/
                        }}>
                    <div style={{ padding: 10 }}>

                        <><h2>Contenedor</h2>
                        <SearchBar/>
                            {/*<div style={{ width: "100%" }} >
                                <div style={{ display: "flex", gap: "5px", alignItems: "center", alignContent: "center" }}>
                                    <Search />
                                    <input id="search" placeholder="Busqueda" type="text" style={{ width: "100%" }} />
                                </div>
                            </div>*/}
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
                <button
                    onClick={() => setOpen(prevValue => !prevValue)}
                    style={{
                        position: "absolute",
                        background: "black",
                        color: "white",
                        cursor: "pointer",
                        top: "50%",
                        transform: "translateY(-50%)",
                        left: open ? "250px" : "0",

                        transition: ".4s ease-in-out",
                        border: "none",
                        borderRadius: "0px 4px 4px 0px",

                        alignContent: "center",
                        alignItems: "center"

                    }}
                    title="">
                    {open ? <ArrowLeft size={10} /> : <ArrowRight size={10} />}
                </button>
            </div>

        </div>
    )
}
