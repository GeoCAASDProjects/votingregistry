import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classes from './people.module.css'
import useEntity from "@renderer/util/hooks/entityHooks";

import { useQuery } from "@tanstack/react-query";
import Button from "@renderer/components/button/Button";
import IconButton from "@renderer/components/iconButton/IconButton";
import { Box } from "@mui/material";
import Modal from "@renderer/components/modal/Modal";
import { useState } from "react";
import MemberCreateForm from "@renderer/components/memberForm/MemberForm";
import useEntityMutations from "@renderer/util/hooks/mutationHooks";
import { createSchool, deleteSchool, fetchAllSchools, fetchSchools, updateSchool } from "@renderer/util/http/school-http";
import SchoolCreateForm from "@renderer/components/schoolForm/SchoolForm";
export default function Schools() {



    const { data: schoolData, isPending: schoolPending, isError: schoolIsError, error: schoolError } = useQuery({
        queryKey: ["schools"],
        queryFn: ({ signal }, query?) => fetchAllSchools({ signal, query }),
        staleTime: 5000,
        gcTime: 30000,
    });




    const schoolMutations = useEntityMutations('school', 'schools', {
        createFn: createSchool,
        updateFn: updateSchool,
        deleteFn: deleteSchool
    });


    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 200,
        renderCell: (params) => {
            return (
                <div style={{ display: "flex", height: "100%", gap: "4px", alignContent: "center", alignItems: "center" }}>
                    <IconButton iconName="Delete" onClick={openDeleteModal} />
                    <IconButton iconName="VisibilityOutlined" onClick={() => alert("Viewing")} />
                </div>

            );
        },
    };

    const columns: GridColDef[] = [
        { field: "name", headerName: "Nombre", width: 150 },
        { field: "created_at", headerName: "Fecha de Creación", width: 150, },
        {
            field: "enclosure",
            headerName: "Recinto",

            width: 150,
            editable: true,
            valueGetter: (params) => `${params?.name ?? "-"}`
        }, actionColumn
    ]

    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);

    function openCreateModal() {
        setOpenModal(true);
    }

    function openDeleteModal() {
        setOpenModalDelete(true);
    }

    async function handleCreateSchool(data) {
        console.log(data)
        try {
            const response = await schoolMutations.createMutation.mutateAsync(data);

            setOpenModal(false);
        } catch (e) {
            console.error(e)
            alert(e);
        }
    }
    return (
        <div style={{ position: "relative", width: "100%", height: "100%", overflowY: "scroll" }}>
            <div style={{ margin: "0px 30px" }}>
                <div style={{ margin: "20px 0" }}>
                    <h1>Colegios</h1>
                </div>
                <Modal isOpen={openModal} setIsOpen={setOpenModal}>
                
                    <SchoolCreateForm submitData={handleCreateSchool} currentSchool={null} isLoading={schoolMutations.createMutation.isPending} />

                </Modal>

                <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} onSubmit={() => alert("Deleting")} title="Borrar Colegio?">
                    <p>Desea borrar el Colegio y todos sus datos asociados? esta accion no es reversible</p>
                </Modal>
                <div style={{ margin: "20px 0", display: "flex", width: "100%", justifyContent: "flex-end" }}>
                    <Button title="Create new" onClick={openCreateModal}></Button>
                </div>

                <div style={{ backgroundColor: "white", flexGrow: 1, display: "flex", alignItems: "center" }}>

                    {!schoolPending && !!schoolData && <DataGrid
                        style={{ height: "450px" }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableDensitySelector
                        disableColumnSelector

                        className={classes["dataTable"]}
                        rows={schoolData?.data}
                        columns={columns}

                    />
                    }
                </div>
            </div>


        </div>


    )
}