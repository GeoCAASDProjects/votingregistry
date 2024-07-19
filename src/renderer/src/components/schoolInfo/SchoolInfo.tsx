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
        plural: "colegios",
        label: "Colegio",
        url: "schools",
        singularUrl: "schools",
        id: currentSchool?.id,
        title: currentSchool?.name,
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
 
}