import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close, Delete, Edit, Visibility } from "@mui/icons-material"
import classes from './sectorInfo.module.css'
import { useEffect, useState } from "react"
import {fetchSectorEnclosures, fetchSectors } from "@renderer/util/http/sector-http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Modal from "../modal/Modal"
import { Link } from "react-router-dom"
import { fetchMembers } from "@renderer/util/http/person-http"
import DynamicLoader from "../dynamicLoader/DynamicLoader"
import ProfilePicture from "../profilePicture/ProfilePicture"
import IconButton from "../iconButton/IconButton"
import InfoTemplate from "../infoTemplate/InfoTemplate"

export default function SectorInfo({ singleSectorPending, memberForm, deleteData, currentSector, clearSector, openMember /*, selectLocation */ }) {


    const { data: enclosureData, isPending: enclosureDataPending, isError: enclosureIsError, error: enclosureError } = useQuery({
        queryKey: [`sector/${currentSector?.id}/enclosures`],
        queryFn: ({ signal }) => fetchSectorEnclosures({ signal, sectorId: currentSector?.id }),
        staleTime: 5000,
        gcTime: 30000,
        enabled: !!currentSector?.id

    });

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();


    function deleteModal() {
        setDeleteModalOpen(true);
    }
 
    console.log(currentSector)

    const infoDisplay = {
        slug: "sector",
        plural: "sectores",
        label: "Sector",
        url: "sectors",
        singularUrl: "sectors",
        close: () => alert("Closing"),

        dataDisplay: [
            {
                label: "Nombre",
                value: currentSector.name
            },
        
        ],
        actions: [
            {
                icon: "Edit",
                label: "Editar",
                action: () => alert("Edit")
            },
            {
                icon: "Delete",
                label: "Delete",
                action: () => alert("Delete")
            },
            {
                icon: "Download",
                label: "Descargar",
                action: () => alert("Descargar")
            },
        ],
        relations:
            [{
                slug: "recinto",
                label: "Recintos",
                url: "enclosures",
                plural: "recintos",
                singularUrl: "sectors",
                data: !enclosureDataPending && enclosureData.hasOwnProperty("data") ? enclosureData.data.map((subInfo)=>{return {name: subInfo.name, address: subInfo.address}}) : [],
                   columns: [
                        {
                            field: 'name',
                            header: "Nombre"
                        },
                        {
                            field: 'address',
                            header: "Dirección"
                        },
                    ],
                actions: [
                    {
                        icon: "Edit",
                        label: "Editar",
                        action: () => alert("Sub data Edit")
                    },
                    {
                        icon: "Delete",
                        label: "Delete",
                        action: () => alert("Sub data Delete")
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
    {!enclosureDataPending ?    <InfoTemplate infoDisplay={infoDisplay} clearInfo={clearSector}/> : <p>Loading</p>}
    </>
)
}