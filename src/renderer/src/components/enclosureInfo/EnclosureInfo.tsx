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

export default function EnclosureInfo({ singleEnclosurePending, /*schoolForm,*/ deleteModal, currentEnclosure, clearEnclosure, selectLocation, openSchool }) {
    /*if(!currentEnclosure){
        return;
    }*/

    const defaultValues = { ...currentEnclosure }
    const [openForm, setIsOpenForm] = useState(false);
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

    function openEditForm() {
        setEdit(true)
        setIsOpenForm(true);
    }
    function openCreateSchool(){
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
    if (openForm) {
        return <EnclosureCreateForm
            open={openForm}
            setOpen={setIsOpenForm}
            edit={edit}
            defaultValues={defaultValues}


        />
    }

    return (

        <>


            {singleEnclosurePending &&
                <DynamicLoader />
            }

            {(!singleEnclosurePending && !!currentEnclosure) ?

                <div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <Close onClick={clearEnclosure} />
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


                    <Button title="Editar" iconName="Edit" onClick={openEditForm} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
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
                :

                <>
                    <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />





                </>



            }
        </>
    )
}