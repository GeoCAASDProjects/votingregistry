import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close, Delete, Edit, Visibility } from "@mui/icons-material"
import classes from './sectorInfo.module.css'
import { useState } from "react"
import { deleteSector, fetchSectors } from "@renderer/util/http/sector-http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Modal from "../modal/Modal"
import { Link } from "react-router-dom"
import { fetchMembers } from "@renderer/util/http/person-http"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import ProfilePicture from "../profilePicture/ProfilePicture"
import IconButton from "../iconButton/IconButton"

export default function SectorInfo({ singleSectorPending, memberForm, deleteData, currentSector, clearSector, openMember /*, selectLocation */ }) {


    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();


    function deleteModal() {
        setDeleteModalOpen(true);
    }


    const infoDisplay = {
        slug: "sector",
        label: "Sector",
        url: "sectors",
        singularUrl: "sectors",
        close: ()=>alert("Closing"),
 
        dataDisplay:[
            {
                label: "Nombre",
                value: "dynamic"
            },
            {
                label: "Dirección",
                value: "dynamic"
            },
            {
                label: "Coordenadas",
                value: "dynamic"
            },
        ],
        actions: [
           {
            icon: "Edit",
            label:"Editar",
            action: ()=>alert("Edit")
           },
           {
            icon: "Delete",
            label:"Delete",
            action: ()=>alert("Delete")
           } ,
           {
            icon: "Download",
            label:"Descargar",
            action: ()=>alert("Descargar")
           } ,
        ],
        relations:
            [{
                slug: "recinto",
                label: "Recintos",
                url: "enclosures",
                singularUrl: "sectors",
                data = "dynamicData",
                table: [
                    {
                        field: 'name',
                        header: "Nombre"
                    },
                    {
                        field: 'name',
                        header: "Nombre"
                    },
                ],
                actions: [
                    {
                     icon: "Edit",
                     label:"Editar",
                     action: ()=>alert("Sub data Edit")
                    },
                    {
                     icon: "Delete",
                     label:"Delete",
                     action: ()=>alert("Sub data Delete")
                    } ,
                    {
                     icon: "Download",
                     label:"Descargar",
                     action: ()=>alert("Sub data Descargar")
                    } ,
                 ]
            },
        ],
        
    }
}

return (

    <>
        {<Modal title="Borrar recinto?" isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => deleteData(currentSector.id)}>
            <p>Deseas borrar el Colegio? esta accion no es reversible</p>
        </Modal>}

        {singleSectorPending &&
            <DynamicLoader />
        }
        <div>
            <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                <IconButton iconName="Close" onClick={clearSector} />
            </div>
            {(!singleSectorPending && !!currentSector) &&

                <div>





                    <table className={classes['table']}>
                        <thead>


                        </thead>
                        <tbody>
                            <tr>

                                <td>   <span style={{ fontWeight: "bold" }}>Nombre</span></td>
                                <td>{currentSector.name}</td>

                            </tr>

                        </tbody>
                    </table>


                    <Button title="Editar" iconName="Edit" onClick={() => alert("Updating")} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Borrar" onClick={deleteModal} iconName="Delete" style={{ background: "#22224F", width: "100%", color: "#FFFFFF", margin: "5px 0px" }} />

                    <h3>Miembros</h3>
                    {<DynamicLoader />}
                    {
                        <div>

                            <table className={classes['table']}>
                                <thead>
                                    <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                    <th>   <span style={{ fontWeight: "bold" }}>Acciones</span></th>

                                </thead>
                                <tbody>

                                    <tr>
                                        <td>John Smith</td>
                                        <td>
                                            <div className={classes["actions"]} >

                                                <Visibility />



                                            </div>

                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                            <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                        </div>
                    }
                    <Button title="Añadir miembro" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                </div>



            }
        </div>
    </>
)
}