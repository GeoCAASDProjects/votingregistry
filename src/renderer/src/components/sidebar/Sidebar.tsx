import { Add, ArrowLeft, ArrowRight, Close, More, Search } from "@mui/icons-material";
import { useState } from "react";
import classes from './sidebar.module.css'
import SearchBar from "../searchBar/SearchBar";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "../button/Button";
import { CircularProgress } from "@mui/material";
import EnclosureCreateForm from "../enclosureForm/EnclosureForm";

export default function Sidebar({ isOpen, toggleSidebar, children, actionState, createForm }): JSX.Element {

    let sideBarButton;
    if (isOpen) {
        sideBarButton = <ArrowLeft />
    } else {
        sideBarButton = <MenuIcon />
    }
    if (actionState == "location" || actionState == "drawPolygon") {
        sideBarButton = <Close />
    }



    return (
        <div className={classes["container"]} style={{

            left: isOpen ? "0px" : "-350px",

        }}>

            <button className={classes["sidebar-toggle"]} onClick={!(actionState == "location" || actionState == "drawPolygon") ? toggleSidebar : createForm}>
                {sideBarButton}
            </button>
            <div style={{ position: "relative" }}>

                <div
                    className={classes["action-container"]}
                >

                    <div style={{ padding: 10 }}>

                        <h2>Contenedor</h2>
                        {children}



                    </div>

                </div>

            </div>

        </div>
    )
}
