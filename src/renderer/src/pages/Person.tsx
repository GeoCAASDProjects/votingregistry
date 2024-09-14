
import Button from "@renderer/components/button/Button";
import DynamicIcon from "@renderer/components/dynamicIcon/DynamicIcon";
import MemberCreateForm from "@renderer/components/memberForm/MemberForm";
import Modal from "@renderer/components/modal/Modal";
import ProfilePicture from "@renderer/components/profilePicture/ProfilePicture";
import UserDataInfo from "@renderer/components/userDataInfo/UserDataInfo";
import { BASE_URL } from "@renderer/config";
import useEntity from "@renderer/util/hooks/entityHooks";
import useEntityMutations from "@renderer/util/hooks/mutationHooks";
import { createPerson, deletePerson, fetchPerson, updatePerson } from "@renderer/util/http/person-http";
import { formatDocument } from "@renderer/util/miscFunctions";
import { formatDate, getNamedDate } from "@renderer/util/time/timeFunction";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Person() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { id } = useParams();

    const [openModal, setOpenModal] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);


    function openEditModal() {
        setOpenModal(true);
    }

    const { data: singlePersonData, isPending: singlePersonPending, isError: singlePersonIsError, error: singlePersonError } = useEntity('person', fetchPerson, id);


    const personMutations = useEntityMutations('person', 'people', {
        createFn: createPerson,
        updateFn: updatePerson,
        deleteFn: deletePerson
    });

    function openDeleteModal() {
        setOpenModalDelete(true);
    }
    
    function goToPeoplePage(){
        navigate('/people');
      };
    async function handleEditPerson(data) {
        const formData = new FormData();
        formData.append('id', data.id)
        formData.append('image', data.image)
        try {
            const response = await personMutations.updateMutation.mutateAsync(data);
            queryClient.refetchQueries({ queryKey: ['person'] });
            setOpenModal(false);

        } catch (e) {
            console.error(e)
            alert(e);
        }
    }

    async function handleDeletePerson(id) {
        try {
            const response = await personMutations.deleteMutation.mutateAsync(id);
            queryClient.refetchQueries({ queryKey: ['person'] });
            setOpenModal(false);
            goToPeoplePage();

        } catch (e) {
            console.error(e)
            alert(e);
        }
    }
    return (
        <div style={{ display: "flex", alignItems: "center", alignContent: "center", flexDirection: "column", margin: "30px 0px", width: "100%", height: "100%" }}>

            <Modal isOpen={openModalDelete} setIsOpen={setOpenModalDelete} onSubmit={() => handleDeletePerson(singlePersonData.data.id)} title="Borrar Miembro?">
                <p>Desea borrar el Miembro y todos sus datos asociados? esta accion no es reversible</p>
            </Modal>
            <Modal isOpen={openModal} setIsOpen={setOpenModal}>
                {singlePersonData && !singlePersonPending && <MemberCreateForm submitData={handleEditPerson} currentSchool={null} defaultValues={singlePersonData?.data} isLoading={personMutations.updateMutation.isPending} />}
            </Modal>

            {(singlePersonData && !singlePersonPending) &&
                <div style={{ display: "flex", flexDirection: "row", alignContent: "center", alignItems: "center", gap: "20px" }}>
                    <ProfilePicture size={100} image={!!singlePersonData.data.image ? `${BASE_URL}storage/${singlePersonData.data.image}` : null} />
                    <div>
                        <h2 style={{ fontWeight: "bold" }}>{`${singlePersonData.data.name} ${singlePersonData.data.last_name}`}</h2>
                        <h3>{`${singlePersonData.data.document}`}</h3>
                        <h5>{`Registrado desde: ${getNamedDate(singlePersonData.data.created_at)}`}</h5>
                    </div>

                </div>
            }

            <section style={{ display: "flex", alignContent: "center", margin: "30px 10px", alignItems: "center", gap: "20px" }}>
                <Button title="Editar" iconName='Edit' onClick={openEditModal} />
                <Button title="Borrar" onClick={openDeleteModal} iconName='Delete' />
            </section>

            <section style={{ display: "flex", alignContent: "center", margin: "30px 10px", alignItems: "center", gap: "50px" }}>
                <UserDataInfo label="Colegio Electoral" data={(singlePersonData && !singlePersonPending && !!singlePersonData?.data?.school?.name) ? singlePersonData.data.school.name : '-'} iconName="HowToVote" />
                <UserDataInfo label="Recinto Electoral" data={(singlePersonData && !singlePersonPending && !!singlePersonData?.data?.school?.enclosure) ? singlePersonData.data.school.enclosure.name : "-"} iconName="Domain" />
            </section>
            <section style={{ margin: "30px 10px", display: "flex", alignContent: "center", alignItems: "center" }}>
                {
                    (singlePersonData && !singlePersonPending) &&
                    <>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }}>
                            <UserDataInfo label="Lugar de Nacimiento" data={singlePersonData.data.place_of_birth} iconName="Public" />
                            <UserDataInfo label="Fecha de Nacimiento" data={formatDate(singlePersonData.data.birth_date)} iconName="Cake" />
                            <UserDataInfo label="Sexo" data={singlePersonData?.data?.sex} iconName="Wc" />
                            <UserDataInfo label="Ocupación" data={singlePersonData?.data?.occupation ?? 'No aplica'} iconName="WorkOutline" />
                            <UserDataInfo label="Teléfono" data={singlePersonData?.data?.phone ?? '-'} iconName="Phone" />
                            <UserDataInfo label="Dirección" data={singlePersonData?.data?.address ?? '-'} iconName="Home" />
                        </div>

                    </>
                }
            </section>
        </div>


    )
}

