import { Add, ArrowLeft, ArrowRight, Close, More, Search } from "@mui/icons-material";
import { useState } from "react";
import classes from './sidebar.module.css'
import SearchBar from "../searchBar/SearchBar";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "../button/Button";
import { CircularProgress } from "@mui/material";

export default function Sidebar({ isOpen, toggleSidebar, currentEnclosure, clearEnclosure, singleEnclosurePending }): JSX.Element {

    return (
        <div style={{
            zIndex: 99999,
            display: "flex",
            position: "absolute",
            top: 0,
            // left: isOpen ? "0px" : "-40vw",
            left: isOpen ? "0px" : "-350px",
            transition: ".4s ease-in-out",
            fontSize: 14,
      
        }}>

            <button className={classes["sidebar-toggle"]} onClick={toggleSidebar}>

                {isOpen ? <ArrowLeft /> : <MenuIcon />}


            </button>
            <div style={{ position: "relative", overflowY: "scroll" }}>

                <div

                    style={
                        {

                            //    width: "40vw",
                            width: "350px",
                            height: "100vh",
                            background: "#0F0F40",
                            color: "white",
                            /*  borderRadius: "0 8px 8px 0",*/
                        }}>

                    <div style={{ padding: 10, height:"100%"}}>

                        <>

                            <h2>Contenedor</h2>

                            <SearchBar />


                        </>
                     {singleEnclosurePending && 
                     <div style={{display:"flex", width:"100%", alignContent:"center", alignItems:"center", justifyContent:"center"}}>
                          <CircularProgress color="inherit" size={30}/>
                        </div>
                  }
 
                        {(!singleEnclosurePending && !!currentEnclosure) ?

                            <>
                                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end"}}>
                                    <Close onClick={clearEnclosure} />
                                </div>

                                <table className={classes['table']}>
                                    <thead>


                                    </thead>
                                    <tbody>
                                        <tr>

                                            <td>   <span style={{ fontWeight: "bold" }}>Nombre</span></td>
                                            <td>{currentEnclosure.name}</td>

                                        </tr>
                                        <tr>
                                            <td>   <span style={{ fontWeight: "bold" }}>Dirección</span></td>
                                            <td>{currentEnclosure.address}</td>

                                        </tr>
                                        <tr>
                                            <td>   <span style={{ fontWeight: "bold" }}>Coordenadas</span></td>
                                            <td>{`${currentEnclosure.longitude}, ${currentEnclosure.latitude}`}</td>

                                        </tr>

                                        <tr>
                                            <td>   <span style={{ fontWeight: "bold" }}>Colegios</span></td>
                                            <td>{currentEnclosure.schools.length ?? 0}</td>
                                        </tr>

                                    </tbody>
                                </table>
                              
                                <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                <h3>Colegios</h3>
                               
                                {currentEnclosure?.schools.length>0 ?
                                    <div>
                                     
                                        <table className={classes['table']}>
                                            <thead>
                                                <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                                <th>   <span style={{ fontWeight: "bold" }}>Personas</span></th>
                                            </thead>
                                            <tbody>
                                                {currentEnclosure?.schools.length > 0 && currentEnclosure.schools.map((enclosure) => (
                                                    <tr>


                                                        <td>{enclosure.name}</td>
                                                        <td>{enclosure.members.length ?? 0 }</td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                    </div>: 
                                    <div style={{margin:"5px 0px"}}>
 <p>Este recinto no cuento con colegios actualmente</p>
                                    </div>
                                   
                                }
                                 <Button title="Añadir colegio" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                 <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                            </>
                            :

                            <>
                                <Button title="Añadir recintos" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />





                            </>



                        }
                    </div>

                </div>

            </div>

        </div>
    )
}
