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
import classes from './home.module.css'
import Button from "@renderer/components/button/Button";

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
      setActionState("enclosure")
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
    mutate: singleEnclosureDeleteMutate,
    data: singleEnclosureDeleteData,
    isPending: singleEnclosureDeletePending,
    isError: singleEnclosureDeleteIsError,
    error: singleEnclosureDeleteError
  } = useMutation({
    mutationFn: deleteEnclosure,
    onSuccess: async (e) => {

      queryClient.refetchQueries({ queryKey: ["enclosures"] });

      setActionState("")
      setCurrentEnclosure(null)

    },
    onError: (e) => {
      console.log("The error inside the mutation")

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

      queryClient.refetchQueries({ queryKey: ["enclosures"] });

      setActionState("enclosures");
      setOpenEnclosureForm(false);
      loadEnclosure(e.data.id);

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

      queryClient.refetchQueries({ queryKey: ["enclosures"] });


    },
    onError: (e) => {

      alert("Error")
    }
  });


  async function submitEnclosureData(data) {
    console.log(data)
    try {
      const response = await singleEnclosureCreateMutate(data);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function updateEnclosureData(data) {

    try {
      const response = singleEnclosureUpdateMutate(data);
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  function toggleSidebar() {

    setOpen(currentVal => !currentVal);
  }


  function clearEnclosure() {
    setActionState("");
    setCurrentEnclosure(null);
  }

  async function loadEnclosure(id: number) {
    clearEnclosure();
    setActionState("enclosure");
    const response = await singleEnclosureMutate(id);
  }

  function clearSchool() {
    setCurrentSchool(null);
    setActionState("enclosure");
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
    if (!openEnclosureForm) {
      setOpenEnclosureForm(true)
      setActionState("")
    }

  }
  function closeMemberForm() {
    if (!currentSchool?.id) {
      setActionState("school");
    } else {
      setActionState("school");
    }
  }

  function createForm() {

    setOpen(true);
    setActionState("");
  }

  function memberForm() {

    setOpen(true);

    if (actionState != "memberForm") {
      setActionState("memberForm");

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
  const [openEnclosureForm, setOpenEnclosureForm] = useState(false);

  const [openMemberForm, setOpenMemberForm] = useState(false);
  
  let renderView;
  renderView = <>
    {actionState == "" && <>
      <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} />
      <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />

    </>}
    {actionState == "enclosure" && <EnclosureInfo
      deleteModal={deleteModal}
      singleEnclosurePending={singleEnclosurePending}
      currentEnclosure={currentEnclosure}
      clearEnclosure={clearEnclosure}
      openSchool={openSchool}
      updateEnclosure={updateEnclosureData}

    />}
    {
      actionState == "school" && <SchoolInfo
        singleSchoolPending={singleSchoolPending}
        currentSchool={currentSchool}

        clearSchool={clearSchool}
        memberForm={memberForm}

      />
    }
    {
      actionState == "memberForm" && <MemberCreateForm closeMemberForm={closeMemberForm} currentSchool={currentSchool?.id} />


    }
  </>
  if (openEnclosureForm) {
    renderView = <EnclosureCreateForm

      defaultValues={defaultFormValues}
      open={openEnclosureForm}
      edit={false}
      setOpen={setOpenEnclosureForm}
      loadEnclosure={loadEnclosure}
      submitData={submitEnclosureData}
      isLoading={singleEnclosureCreatePending}
    />
  }
  return (
    <>
      <div className={classes["home-container"]}>
        {<Modal title="Borrar recinto?" isOpen={isOpen} setIsOpen={setIsOpen} onSubmit={() => deleteData(currentEnclosure?.id)}>
          <p>Deseas borrar el Recinto junto con todos sus colegios y usuarios?</p>
        </Modal>}

        <Sidebar
          actionState={actionState}
          isOpen={open}
          toggleSidebar={toggleSidebar}
          createForm={createForm}
        >

          {renderView}

        </Sidebar>
        <SimpleMap openForm={openForm} currentEnclosure={currentEnclosure?.id ?? null} actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null} />
      </div>

    </>

  )
}