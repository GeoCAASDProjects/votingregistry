import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close, Delete, Edit, Visibility } from "@mui/icons-material"
import classes from './enclosureInfo.module.css'
import { useState } from "react"
import { deleteSchool, fetchSchools } from "@renderer/util/http/school-http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Modal from "../modal/Modal"
import { Link } from "react-router-dom"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import EnclosureCreateForm from "../enclosureForm/EnclosureForm"
import SchoolCreateForm from "../schoolForm/SchoolForm"
import IconButton from "../iconButton/IconButton"
import InfoTemplate from "../infoTemplate/InfoTemplate"

export default function EnclosureInfo({ singleEnclosurePending, currentEnclosure, clearEnclosure, openForm, openSchool, openSchoolForm, deleteData }) {
    if (!singleEnclosurePending && !currentEnclosure) {
        return <p>There's no data here</p>
    }

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    const defaultValues = { ...currentEnclosure }
    // const [openSchoolForm, setOpenSchoolForm] = useState(false)


    const queryClient = useQueryClient();

    // const [currentSchool, setCurrentSchool] = useState(null);
    const { data: schoolData, isPending: schoolDataPending, isError: schoolIsError, error: schoolError } = useQuery({
        queryKey: [`enclosure/${currentEnclosure?.id}/schools`],
        queryFn: ({ signal }) => fetchSchools({ signal, enclosureId: currentEnclosure?.id }),
        staleTime: 5000,
        gcTime: 30000,
        enabled: !!currentEnclosure?.id

    });

    /*
        function openCreateSchool() {
            setOpenSchoolForm(true)
        }
    
        if (openSchoolForm) {
    
            return <SchoolCreateForm
                defaultValues={{}}
                currentEnclosure={currentEnclosure?.id}
                edit={false}
                open={openSchoolForm}
                setOpen={setOpenSchoolForm}
            />
        }*/

    function deleteModal() {
        setDeleteModalOpen(true);
    }


 


    const infoDisplay = {
        isLoading: singleEnclosurePending,
        slug: "enclosure",
        plural: "recintos",
        label: "Recinto",
        url: "enclosures",
        singularUrl: "enclosures",
        id: currentEnclosure?.id,
        close: () => alert("Closing"),
        deleteFunction: deleteData,
        dataDisplay: [
            {
                label: "Nombre",
                value: currentEnclosure?.name
            },
            {
                label: "Dirección",
                value: `${currentEnclosure?.address} (${currentEnclosure?.longitude}, ${currentEnclosure?.latitude})`
            },

        ],
        actions: [
            {
                icon: "Edit",
                label: "Editar",
                action: openForm
            },
            {
                icon: "Download",
                label: "Descargar",
                action: () => alert("Descargar")
            },
        ],
        relations:
            [{
                slug: "school",
                label: "Colegio",
                url: "schools",
                plural: "schools",
                singularUrl: "school",
                data: !schoolDataPending && schoolData.hasOwnProperty("data") ? schoolData.data.map((subInfo) => { return {id: subInfo.id, name: subInfo.name, members: subInfo.members.length } }) : [],
                columns: [
                    {
                        field: 'name',
                        header: "Nombre"
                    },
                    {
                        field: 'members',
                        header: "Miembros"
                    },
                ],
                rowActions: [
                    {
                        name: "Ver",
                        icon: "Visibility",
                        action: openSchool
                    }
                ],
                actions: [

                    {
                        icon: "Download",
                        label: "Descargar",
                        action: () => alert("Sub data Descargar")
                    },
                ]
            },
            ],

    }

    
    return (

        <>
            {!schoolDataPending ? <InfoTemplate infoDisplay={infoDisplay} clearInfo={clearEnclosure} /> : <DynamicLoader/>}
        </>
    )

    /*
    return (

        <>

            {<Modal title="Borrar recinto?" isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => deleteData(currentEnclosure?.id)}>
                <p>Deseas borrar el Recinto junto con todos sus colegios y usuarios?</p>
            </Modal>}
            {singleEnclosurePending &&
                <DynamicLoader />
            }

            {(!singleEnclosurePending && !!currentEnclosure) &&

                <div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <IconButton iconName="Close" onClick={clearEnclosure}/>
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
                                <td>{`${currentEnclosure.address}  (${currentEnclosure.longitude}, ${currentEnclosure.latitude})`}</td>

                            </tr>

                        </tbody>
                    </table>


                    <Button title="Editar" iconName="Edit" onClick={openForm} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Borrar" onClick={deleteModal} iconName="Delete" style={{ background: "#22224F", width: "100%", color: "#FFFFFF", margin: "5px 0px" }} />

                    <h3>Colegios</h3>
                    {(schoolDataPending && !schoolError) && <DynamicLoader />}
                    {!schoolDataPending && schoolData?.data.length > 0 ?
                        <div>

                            <table className={classes['table']}>
                                <thead>
                                    <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                    <th>   <span style={{ fontWeight: "bold" }}>Personas</span></th>
                                    <th>   <span style={{ fontWeight: "bold" }}>Acciones</span></th>
                                   
                                </thead >
    <tbody>
        {schoolData?.data.length > 0 && schoolData?.data.map((enclosure) => (
            <tr key={enclosure.id}>


                <td>   {enclosure.name}</td>
                <td style={{ textAlign: "center" }}>
                    {enclosure.members.length ?? 0}</td>
                {<td>
                    <div className={classes["actions"]} onClick={() => openSchool(enclosure.id)}>

                        <Visibility />



                    </div>

                </td>}
            </tr>
        ))}

    </tbody>
                            </table >
    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                        </div > :
<div style={{ margin: "5px 0px" }}>
    <p>Este recinto no cuento con colegios actualmente</p>
</div>

                    }
                    <Button onClick={openSchoolForm} title="Añadir colegio" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                </div >




            }
        </>
    )*/
}