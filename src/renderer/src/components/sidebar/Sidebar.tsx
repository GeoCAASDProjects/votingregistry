import { Add, ArrowLeft, ArrowRight, Close, More, Search } from "@mui/icons-material";
import { useState } from "react";
import classes from './sidebar.module.css'
import SearchBar from "../searchBar/SearchBar";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "../button/Button";
import { CircularProgress } from "@mui/material";

export default function Sidebar({ isOpen, toggleSidebar, currentEnclosure, clearEnclosure, singleEnclosurePending, selectLocation, actionState, createForm }): JSX.Element {

    let sideBarButton;
    if (isOpen) {
        sideBarButton = <ArrowLeft />
    } else {
        sideBarButton = <MenuIcon />
    }
    if (actionState == "location") {
        sideBarButton = <Close />
    }

    return (
        <div className={classes["container"]} style={{

            left: isOpen ? "0px" : "-350px",

        }}>

            <button className={classes["sidebar-toggle"]} onClick={!actionState ? toggleSidebar : createForm}>
                {sideBarButton}
            </button>
            <div style={{ position: "relative" }}>

                <div
                    className={classes["action-container"]}
                >

                    <div style={{ padding: 10 }}>

                        <>

                            <h2>Contenedor</h2>

                            <SearchBar />


                        </>
                        {singleEnclosurePending &&
                            <div style={{ display: "flex", width: "100%", alignContent: "center", alignItems: "center", justifyContent: "center" }}>
                                <CircularProgress color="inherit" size={30} />
                            </div>
                        }

                        {(!singleEnclosurePending && !!currentEnclosure) ?

                            <div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
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

                                {currentEnclosure?.schools.length > 0 ?
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
                                                        <td>{enclosure.members.length ?? 0}</td>

                                                    </tr>
                                                ))}

                                            </tbody>
                                        </table>
                                        <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                    </div> :
                                    <div style={{ margin: "5px 0px" }}>
                                        <p>Este recinto no cuento con colegios actualmente</p>
                                    </div>

                                }
                                <Button title="Añadir colegio" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                                <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                            </div>
                            :

                            <>
                                <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
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
