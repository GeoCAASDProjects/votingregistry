import { DataGrid, GridColDef } from "@mui/x-data-grid";
import classes from './people.module.css'
import useEntity from "@renderer/util/hooks/entityHooks";
import { createPerson, deletePerson, fetchPeople, updatePerson } from "@renderer/util/http/person-http";
import { useQuery } from "@tanstack/react-query";
import Button from "@renderer/components/button/Button";
import IconButton from "@renderer/components/iconButton/IconButton";
import { Box } from "@mui/material";
import Modal from "@renderer/components/modal/Modal";
import { useState } from "react";
import MemberCreateForm from "@renderer/components/memberForm/MemberForm";
import useEntityMutations from "@renderer/util/hooks/mutationHooks";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "@renderer/config";
import ProfilePicture from "@renderer/components/profilePicture/ProfilePicture";
import DataTable from "@renderer/components/dataTable/DataTable";
export default function People() {


  const { data: peopleData, isPending: peoplePending, isError: peopleIsError, error: peopleError } = useQuery({
    queryKey: ["people"],
    queryFn: ({ signal }, query?) => fetchPeople({ signal, query }),
    staleTime: 5000,
    gcTime: 30000,
  });




  const personMutations = useEntityMutations('person', 'people', {
    createFn: createPerson,
    updateFn: updatePerson,
    deleteFn: deletePerson
  });

  const navigate = useNavigate();

  const goToPersonDetail = (id) => {
    // Programmatically navigate to /people/id
    navigate(`/people/${id}`);
  };


  const columns: GridColDef[] = [
    {
      field: "avatar", headerName: "Avatar", width: 100,
      renderCell: (params) => {

        return <ProfilePicture size={40} image={params.row.image ? `${BASE_URL}storage/${params.row.image}` : null} />
      }
    },
    { field: "name", headerName: "Nombre", width: 150 },
    { field: "last_name", headerName: "Apellido", width: 150, },
    { field: "sex", headerName: "Sexo", width: 150, },
    { field: "document", headerName: "Cédula", width: 150, },
    { field: "nationality", headerName: "Nacionalidad", width: 150, },
    { field: "place_of_birth", headerName: "Lugar de Nacimiento", width: 150, },
    { field: "occupation", headerName: "Ocupación", width: 150, },
    {
      field: "school",
      headerName: "Colegio",

      width: 150,
      editable: true,
      valueGetter: (params) => `${params?.name ?? "-"}`
    },
    { field: "address", headerName: "Dirección", width: 150, }
  ]

  const [openModal, setOpenModal] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  function openCreateModal() {
    setOpenModal(true);
  }

  function openDeleteModal() {
    setOpenModalDelete(true);
  }

  async function handleCreatePerson(data) {
 
    try {
      const response = await personMutations.createMutation.mutateAsync(data);

      setOpenModal(false);
    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  return (
    <div style={{ height:"100%", width: "100%", position:"relative" , overflowY: "scroll"}}>
       <div style={{ margin: "0px 30px", position:"relative" }}>
    <div className={classes["people"]}>
      <div className={classes["info"]}>
        <h1>People</h1>
        <div style={{ margin: "20px 0", display: "flex", width: "100%", justifyContent: "flex-end" }}>
                    <Button title="Create new" onClick={openCreateModal}></Button>
                </div>

      </div>
      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <MemberCreateForm submitData={handleCreatePerson} currentSchool={null} isLoading={personMutations.createMutation.isPending} />
      </Modal>
      <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} onSubmit={() => alert("Deleting")} title="Borrar Miembro?">
        <p>Desea borrar el Miembro y todos sus datos asociados? esta accion no es reversible</p>
      </Modal>
      {peoplePending ? "Loading" : <DataTable slug="people" columns={columns} rows={peopleData.data} />}

      </div>
    </div>
    </div>
  )

  /*
    return (
      <div style={{ position: "relative", width: "100%", height: "100%", overflowY: "scroll" }}>
        <div style={{ margin: "0px 30px" }}>
          <div style={{ margin: "20px 0" }}>
            <h1>Personas</h1>
          </div>
          <Modal isOpen={openModal} setIsOpen={setOpenModal}>
            <MemberCreateForm submitData={handleCreatePerson} currentSchool={null} isLoading={personMutations.createMutation.isPending} />
          </Modal>
  
          <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} onSubmit={() => alert("Deleting")} title="Borrar Miembro?">
            <p>Desea borrar el Miembro y todos sus datos asociados? esta accion no es reversible</p>
          </Modal>
          <div style={{ margin: "20px 0", display: "flex", width: "100%", justifyContent: "flex-end" }}>
            <Button title="Create new" onClick={openCreateModal}></Button>
          </div>
  
          <div style={{ backgroundColor: "white", flexGrow: 1, display: "flex", alignItems: "center" }}>
  
            {!peoplePending && !!peopleData && <DataGrid
              style={{ height: "450px" }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableDensitySelector
              disableColumnSelector
  
              className={classes["dataTable"]}
              rows={peopleData?.data}
              columns={[...columns, actionColumn]}
  
            />
            }
          </div>
        </div>
  
  
      </div>
  
  
    )*/
}

