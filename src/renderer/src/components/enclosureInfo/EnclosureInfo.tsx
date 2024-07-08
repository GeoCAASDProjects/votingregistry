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

export default function EnclosureInfo({ singleEnclosurePending, currentEnclosure, clearEnclosure, openForm, openSchool, deleteData }) {
    /*if(!currentEnclosure){
        return;
    }*/

    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)

    const defaultValues = { ...currentEnclosure }
    const [openSchoolForm, setOpenSchoolForm] = useState(false)
    const [edit, setEdit] = useState(false);

    const queryClient = useQueryClient();

    // const [currentSchool, setCurrentSchool] = useState(null);
    const { data: schoolData, isPending: schoolDataPending, isError: schoolIsError, error: schoolError } = useQuery({
        queryKey: [`enclosure/${currentEnclosure?.id}/schools`],
        queryFn: ({ signal }) => fetchSchools({ signal, enclosureId: currentEnclosure?.id }),
        staleTime: 5000,
        gcTime: 30000,
        enabled: !!currentEnclosure?.id

    });


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
    }

    function deleteModal() {
        setDeleteModalOpen(true);
    }
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
                                    {/*    <th>   <span style={{ fontWeight: "bold" }}>Acciones</span></th>*/}
                                </thead>
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
                            </table>
                            <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                        </div> :
                        <div style={{ margin: "5px 0px" }}>
                            <p>Este recinto no cuento con colegios actualmente</p>
                        </div>

                    }
                    <Button onClick={openCreateSchool} title="Añadir colegio" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Colegios" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                </div>




            }
        </>
    )
}