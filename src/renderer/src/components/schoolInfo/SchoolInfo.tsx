import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close, Delete, Edit, Visibility } from "@mui/icons-material"
import classes from './schoolInfo.module.css'
import { useState } from "react"
import { deleteSchool, fetchSchools } from "@renderer/util/http/school-http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Modal from "../modal/Modal"
import { Link } from "react-router-dom"
import { fetchMembers } from "@renderer/util/http/person-http"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import ProfilePicture from "../profilePicture/ProfilePicture"
import IconButton from "../iconButton/IconButton"
import InfoTemplate from "../infoTemplate/InfoTemplate"

export default function SchoolInfo({ singleSchoolPending, memberForm, deleteData, currentSchool, clearSchool, openMember, openForm }) {
 /*
 
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const [currentMember, setCurrentMember] = useState(null);*/
    const { data: memberData, isPending: memberDataPending, isError: memberIsError, error: memberError } = useQuery({
        queryKey: [`school/${currentSchool?.id}/members`],
        queryFn: ({ signal }) => fetchMembers({ signal, schoolId: currentSchool?.id }),
        staleTime: 5000,
        gcTime: 30000,
        enabled: !!currentSchool?.id

    });


    const infoDisplay = {
        isLoading: singleSchoolPending,
        slug: "school",
        plural: "escuelas",
        label: "Escuela",
        url: "schools",
        singularUrl: "schools",
        id: currentSchool?.id,
        close: () => alert("Closing"),
        deleteFunction: deleteData,
        dataDisplay: [
            {
                label: "Nombre",
                value: currentSchool?.name
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
                slug: "member",
                label: "Miembro",
                url: "members",
                plural: "members",
                singularUrl: "member",
                isLoading: memberDataPending,
                data:  !!memberData && memberData.hasOwnProperty("data") ? memberData.data.map((subInfo) => { return {id: subInfo.id, name: `${subInfo.name} ${subInfo.last_name}` } }) : [],
                columns: [
                    {
                        field: 'name',
                        header: "Nombre"
                    },
               
                ],
                rowActions: [
                    {
                        name: "Ver",
                        icon: "Visibility",
                     action: openMember
                    }
                ],
                actions: [
                    {
                        icon: "Add",
                        label: "Añadir Miembro",
                        action: memberForm
                    },

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
           <InfoTemplate infoDisplay={infoDisplay} clearInfo={clearSchool} /> 
        </>
    )
    /*
    function deleteModal() {
        setDeleteModalOpen(true);
    }
    */
/*
    return (

        <>
            {<Modal title="Borrar escuela?" isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} onSubmit={() => deleteData(currentSchool.id)}>
                <p>Deseas borrar el Colegio? esta accion no es reversible</p>
            </Modal>}

            {singleSchoolPending  &&
                <DynamicLoader />
            }
    <div>
    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                    <IconButton iconName="Close" onClick={clearSchool}/>
                    </div>
            {(!singleSchoolPending && !!currentSchool) &&

                <div>
               




                    <table className={classes['table']}>
                        <thead>


                        </thead>
                        <tbody>
                            <tr>

                                <td>   <span style={{ fontWeight: "bold" }}>Nombre</span></td>
                                <td>{currentSchool.name}</td>

                            </tr>

                        </tbody>
                    </table>


                    <Button title="Editar" iconName="Edit" onClick={openForm} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Borrar" onClick={deleteModal} iconName="Delete" style={{ background: "#22224F", width: "100%", color: "#FFFFFF", margin: "5px 0px" }} />

                    <h3>Miembros</h3>
                    {(memberDataPending && !memberError) && <DynamicLoader />}
                    {!memberDataPending && memberData?.data.length > 0 ?
                        <div>

                            <table className={classes['table']}>
                                <thead>
                                    <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                    <th>   <span style={{ fontWeight: "bold" }}>Acciones</span></th>

                                </thead>
                                <tbody>
                                    {memberData?.data.length > 0 && memberData?.data.map((member) => (
                                        <tr key={member.id}>
                                            <td>{`${member.name} ${member.last_name}`}</td>
                                            <td>
                                                <div className={classes["actions"]} onClick={() => openMember(member.id)}>

                                                    <Visibility />



                                                </div>

                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                        </div> :
                        <div style={{ margin: "5px 0px" }}>
                            <p>Este colegio no cuenta con miembros actualmente</p>
                        </div>

                    }
                    <Button onClick={memberForm} title="Añadir miembro" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                </div>



            }
            </div>
        </>
    )*/
}