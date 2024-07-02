import EnclosureCreateForm from "@renderer/components/enclosureForm/EnclosureForm";
import EnclosureInfo from "@renderer/components/enclosureInfo/EnclosureInfo";
import SimpleMap from "@renderer/components/map/SimpleMap";
import MemberCreateForm from "@renderer/components/memberForm/MemberForm";
import Modal from "@renderer/components/modal/Modal";
import SchoolCreateForm from "@renderer/components/schoolForm/SchoolForm";
import SchoolInfo from "@renderer/components/schoolInfo/SchoolInfo";
import SearchBar from "@renderer/components/searchBar/SearchBar";
import Sidebar from "@renderer/components/sidebar/Sidebar";
import { createEnclosure, deleteEnclosure, fetchEnclosure, fetchEnclosures, updateEnclosure } from "@renderer/util/http/enclosure-http";
import { createSchool, fetchSchool } from "@renderer/util/http/school-http";
import { Enclosure } from "@renderer/util/types";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export default function Home(): JSX.Element {
  const queryClient = useQueryClient();
  const [actionState, setActionState] = useState("");
  const [open, setOpen] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({});
  const [currentEnclosure, setCurrentEnclosure] = useState<Enclosure | null>(null);
  const [currentSchool, setCurrentSchool] = useState(null);

  const { data: enclosureData, isPending: enclosurePending, isError: enclosureIsError, error: enclosureError } = useQuery({
    queryKey: ["enclosures"],
    queryFn: ({ signal }, query?) => fetchEnclosures({ signal, query }),
    staleTime: 5000,
    gcTime: 30000,
  });

  const {
    mutate: singleEnclosureMutate,
    data: singleEnclosureData,
    isPending: singleEnclosurePending,
    isError: singleEnclosureIsError,
    error: singleEnclosureError
  } = useMutation({
    mutationFn: fetchEnclosure,
    onSuccess: async (e) => {
      console.log(e.data)
      console.log("------------------------------------")
      setCurrentEnclosure(e.data)
    },
    onError: (e) => {

      alert("Error")
    }
  });

  const {
    mutate: singleSchoolMutate,
    data: singleSchoolData,
    isPending: singleSchoolPending,
    isError: singleSchoolIsError,
    error: singleSchoolError
  } = useMutation({
    mutationFn: fetchSchool,
    onSuccess: async (e) => {
      setCurrentSchool(e.data);
      setActionState("school");
    },
    onError: (e) => {

      alert("Error")
    }
  });

  const {
    mutate: singleEnclosureCreateMutate,
    data: singleEnclosureCreateData,
    isPending: singleEnclosureCreatePending,
    isError: singleEnclosureCreateIsError,
    error: singleEnclosureCreateError
  } = useMutation({
    mutationFn: createEnclosure,
    onSuccess: async (e) => {
      console.log("The data")
      console.log(e.data);
      queryClient.refetchQueries({ queryKey: ["enclosures"] });
      setActionState("")
      setCurrentEnclosure(e.data)

    },
    onError: (e) => {

      alert("Error")
    }
  });

  const {
    mutate: singleEnclosureUpdateMutate,
    data: singleEnclosureUpdateData,
    isPending: singleEnclosureUpdatePending,
    isError: singleEnclosureUpdateIsError,
    error: singleEnclosureUpdateError
  } = useMutation({
    mutationFn: updateEnclosure,
    onSuccess: async (e) => {
      console.log("The data")
      console.log(e.data);
      queryClient.refetchQueries({ queryKey: ["enclosures"] });
      setActionState("")
      setCurrentEnclosure(e.data)

    },
    onError: (e) => {

      alert("Error")
    }
  });


  const {
    mutate: singleEnclosureDeleteMutate,
    data: singleEnclosureDeleteData,
    isPending: singleEnclosureDeletePending,
    isError: singleEnclosureDeleteIsError,
    error: singleEnclosureDeleteError
  } = useMutation({
    mutationFn: deleteEnclosure,
    onSuccess: async (e) => {
      console.log("The data")
      console.log(e.data);
      queryClient.refetchQueries({ queryKey: ["enclosures"] });
      setActionState("")
      setCurrentEnclosure(null)

    },
    onError: (e) => {
      console.log("The error inside the mutation")
      console.log(e)
    }
  });


  const {
    mutate: singleSchoolCreateMutate,
    data: singleSchoolCreateData,
    isPending: singleSchoolCreatePending,
    isError: singleSchoolCreateIsError,
    error: singleSchoolCreateError
  } = useMutation({
    mutationFn: createSchool,
    onSuccess: async (e) => {

      queryClient.refetchQueries({ queryKey: ["enclosures"] });
      console.log(e.data)
      setActionState("");
      clearEnclosure();

      const response = await singleEnclosureMutate(e.data.enclosure_id);

    },
    onError: (e) => {

      alert("Error")
    }
  });

  function toggleSidebar() {
    setOpen(currentVal => !currentVal);
  }


  function clearEnclosure() {
    setCurrentEnclosure(null);
  }

  function clearSchool() {
    setCurrentSchool(null);
    setActionState("");
  }

  function selectLocation() {
    setOpen(false);
    setActionState("location")
  }

  async function sendDataToSidebar(id: number) {
    if (!open) {
      toggleSidebar();
    }
    if (currentEnclosure?.id == id) {
      return;
    }
    const response = await singleEnclosureMutate(id);


  }

  async function openSchool(id: number) {
    if (!open) {
      setOpen(true);
    }

    const response = await singleSchoolMutate(id);


  }

  function openForm(data) {
    setDefaultFormValues({ longitude: data.lng.toFixed(2), latitude: data.lat.toFixed(2), address: data.address })
    if (!open) {
      setOpen(true);
    }
    if (actionState != "form") {
      setActionState("form")
    }

  }
  function closeMemberForm(){
    if(!currentSchool?.id){
    setActionState("school");
    } else{
    setActionState("");
    }
  }

  function createForm() {

    setOpen(true);
    setActionState("");
  }
  function editForm() {
    setOpen(true);
    if (actionState != "editForm") {
      setDefaultFormValues({ ...currentEnclosure })
      setActionState("editForm");

    }
  }
  function schoolForm() {
    setOpen(true);
    if (actionState != "schoolForm") {
      setActionState("schoolForm");

    }
  }
  function memberForm() {

    setOpen(true);

    if (actionState != "memberForm") {
      setActionState("memberForm");

    }
  }
  async function submitData(data) {
    console.log(data)
    try {
      const response = singleEnclosureCreateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }
  async function submitSchoolData(data) {

    try {
      const response = singleSchoolCreateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }
  async function updateData(data) {

    try {
      const response = singleEnclosureUpdateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }
  async function deleteData(id) {

    try {
      const response = singleEnclosureDeleteMutate(id);

      setIsOpen(false);
    } catch (e) {
      console.error(e)

    }
  }
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function deleteModal() {
    setIsOpen(true);
  }


  const searchDataFunction = async (query: string): Promise<object[]> => {


    const searchData = await fetchEnclosures({ signal: null, query: query });
    if (searchData instanceof Error) {

      return [];
    }

    const transformedData = searchData.data.map(location => { return { id: location.id, name: location.name, geometry: [location.longitude, location.latitude] } });

    return transformedData;



  }

  function selectSearch(data) {

    sendDataToSidebar(data.id);
  }

  return (
    <>
      <div style={{ flex: 1, height: "100%" }}>
        {<Modal title="Borrar recinto?" isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={() => deleteData(currentEnclosure?.id)}>
          <p>Deseas borrar el Recinto junto con todos sus colegios y usuarios?</p>
        </Modal>}


        <Sidebar
          actionState={actionState}
          isOpen={open}
          toggleSidebar={toggleSidebar}
          createForm={createForm}
        >

          {actionState == "" && <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} />}

          {(actionState == "form" || actionState == "editForm") &&
            <EnclosureCreateForm
              submitData={actionState == "editForm" ? updateData : submitData}
              defaultValues={defaultFormValues}
              isLoading={singleEnclosureCreatePending}
              edit={actionState == "editForm"}
            />}

          {(actionState == "schoolForm") && <SchoolCreateForm
            currentEnclosure={currentEnclosure?.id}
            submitData={submitSchoolData}
            isLoading={singleSchoolCreatePending}
            edit={false}
            defaultValues={{}}
          />}

          {actionState == "" && <EnclosureInfo
            deleteModal={deleteModal}
            editForm={editForm}
            singleEnclosurePending={singleEnclosurePending}
            currentEnclosure={currentEnclosure}
            clearEnclosure={clearEnclosure}
            selectLocation={selectLocation}
            schoolForm={schoolForm}
            openSchool={openSchool}
          />}

          {actionState == "school" && <SchoolInfo
            currentSchool={currentSchool}
            singleSchoolPending={singleSchoolPending}
            clearSchool={clearSchool}
            memberForm={memberForm}
          /*
            deleteModal={deleteModal}
            editForm={editForm}
      */
          />
          }

          {(actionState == "memberForm") &&

            <MemberCreateForm closeMemberForm={closeMemberForm} currentSchool={currentSchool?.id} />
          }

        </Sidebar>
        <SimpleMap openForm={openForm} currentEnclosure={currentEnclosure?.id ?? null} actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null} />
      </div>

    </>

  )
}