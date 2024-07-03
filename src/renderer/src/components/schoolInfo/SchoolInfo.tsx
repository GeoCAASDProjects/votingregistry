import { CircularProgress } from "@mui/material"
import Button from "../button/Button"
import { Close, Delete, Edit } from "@mui/icons-material"
import classes from './schoolInfo.module.css'
import { useState } from "react"
import { deleteSchool, fetchSchools } from "@renderer/util/http/school-http"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import Modal from "../modal/Modal"
import { Link } from "react-router-dom"
import { fetchMembers } from "@renderer/util/http/person-http"
import DynamicLoader from "../dynamicLoader/DynamicLoader"

export default function SchoolInfo({ singleSchoolPending, memberForm,  /*deleteModal, editForm,*/ currentSchool , clearSchool /*, selectLocation */}) {

    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient();

    const [currentMember, setCurrentMember] = useState(null);
   const { data: memberData, isPending: memberDataPending, isError: memberIsError, error: memberError } = useQuery({
      queryKey: [`school/${currentSchool?.id}/members`],
      queryFn: ({ signal }) => fetchMembers({ signal, schoolId: currentSchool?.id}),
      staleTime: 5000,
      gcTime: 30000,
      enabled: !!currentSchool?.id
      
    });
  

    return (

        <>
  

            {singleSchoolPending &&
               <DynamicLoader/>
            }

            {(!singleSchoolPending && !!currentSchool) ?

                <div>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <Close onClick={clearSchool} />
                    </div>

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


                    <Button title="Editar" iconName="Edit" onClick={()=>alert("Updating")} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Descargar" iconName="Download" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Borrar" onClick={()=>alert("Deleting")} iconName="Delete" style={{ background: "#22224F", width: "100%", color: "#FFFFFF", margin: "5px 0px" }} />

                    <h3>Miembros</h3>
                    {(memberDataPending && !memberError) && <DynamicLoader/>}
                    {!memberDataPending && memberData?.data.length > 0 ?
                        <div>

                            <table className={classes['table']}>
                                <thead>
                                    <th>   <span style={{ fontWeight: "bold" }}>Nombre</span></th>
                                   
                                
                                </thead>
                                <tbody>
                                    {memberData?.data.length > 0 && memberData?.data.map((member) => (
                                        <tr key={member.id}>
                                            <td>{`${member.name} ${member.last_name}`}</td>
                                        
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
                :

                <>
              
                    <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
                    <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />





                </>



            }
        </>
    )
}