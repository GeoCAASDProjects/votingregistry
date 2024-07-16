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
                isLoading: schoolDataPending,
                data:  !!schoolData && schoolData.hasOwnProperty("data") ? schoolData.data.map((subInfo) => { return {id: subInfo.id, name: subInfo.name, members: subInfo.members.length } }) : [],
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
           <InfoTemplate infoDisplay={infoDisplay} clearInfo={clearEnclosure} /> 
        </>
    )
 
}