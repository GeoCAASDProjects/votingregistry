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
import { createSchool, deleteSchool, fetchSchool, updateSchool } from "@renderer/util/http/school-http";
import { Enclosure } from "@renderer/util/types";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import classes from './home.module.css'
import Button from "@renderer/components/button/Button";
import MemberInfo from "@renderer/components/memberInfo/MemberInfo";
import { fetchPerson } from "@renderer/util/http/person-http";

export default function Home(): JSX.Element {
  const queryClient = useQueryClient();
  const [actionState, setActionState] = useState("");
  const [open, setOpen] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({});
  const [currentEnclosure, setCurrentEnclosure] = useState<Enclosure | null>(null);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);

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
    mutate: singleMemberMutate,
    data: singleMemberData,
    isPending: singleMemberPending,
    isError: singleMemberIsError,
    error: singleMemberError
  } = useMutation({
    mutationFn: fetchPerson,
    onSuccess: async (e) => {
      setCurrentMember(e.data);
      setActionState("member");
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
    mutate: singleSchoolDeleteMutate,
    data: singleSchoolDeleteData,
    isPending: singleSchoolDeletePending,
    isError: singleSchoolDeleteIsError,
    error: singleSchoolDeleteError
  } = useMutation({
    mutationFn: deleteSchool,
    onSuccess: async (e) => {

      queryClient.refetchQueries({ queryKey: ["enclosures"] });

      setActionState("enclosure")


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

      //  setActionState("enclosures");
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
      //   setActionState("enclosures");
      setOpenEnclosureForm(false);
      loadEnclosure(e.data.id);

    },
    onError: (e) => {

      alert("Error")
    }
  });

  const {
    mutate: singleSchoolUpdateMutate,
    data: singleSchoolUpdateData,
    isPending: singleSchoolUpdatePending,
    isError: singleSchoolUpdateIsError,
    error: singleSchoolUpdateError
  } = useMutation({
    mutationFn: updateSchool,
    onSuccess: async (e) => {

      queryClient.refetchQueries({ queryKey: ["enclosures"] });
      //   setActionState("enclosures");
      
      setCurrentSchool(e.data.id);

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

  async function updateSchoolData(data) {

    try {
      const response = singleSchoolUpdateMutate(data);
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
    const response = await singleEnclosureMutate(id);
    setActionState("enclosure");
  }

  function clearSchool() {
    setCurrentSchool(null);
    setActionState("enclosure");
  }
  
  function clearMember() {
    setCurrentMember(null);
    setActionState("school");
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
  async function openMember(id){
    if (!open) {
      setOpen(true);
    }

    const response = await singleMemberMutate(id);
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


    } catch (e) {
      console.error(e)

    }
  }

  async function deleteSchoolData(id) {

    try {
      const response = singleSchoolDeleteMutate(id);


    } catch (e) {
      console.error(e)

    }
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
  const [openSchoolForm, setOpenSchoolForm] = useState(false);
  const [openMemberForm, setOpenMemberForm] = useState(false);

  function openEditForm() {
    setDefaultFormValues({ ...currentEnclosure })
    setOpenEnclosureForm(true);
  }
 
  let renderView;
  renderView = <>
    {actionState == "" && <>
      <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} />
      <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Añadir sector" iconName="Polyline" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />

    </>}
    {actionState == "enclosure" && <EnclosureInfo

      singleEnclosurePending={singleEnclosurePending}
      currentEnclosure={currentEnclosure}
      clearEnclosure={clearEnclosure}
      openSchool={openSchool}
      openForm={openEditForm}
      deleteData={deleteData}

    />}
    {
      actionState == "school" && <SchoolInfo
        singleSchoolPending={singleSchoolPending}
        currentSchool={currentSchool}

        clearSchool={clearSchool}
        memberForm={memberForm}
        deleteData={deleteSchoolData}
        openMember={openMember}
      />
    }
    {
      actionState == "memberForm" && <MemberCreateForm closeMemberForm={closeMemberForm} currentSchool={currentSchool?.id} />


    }
    {
      actionState == "member" &&  <MemberInfo currentMember={currentMember} openSchool={openSchool} clearMember={clearMember}/>
      
    }
  </>
  if (openEnclosureForm) {
    renderView = <EnclosureCreateForm

      defaultValues={defaultFormValues}
      open={openEnclosureForm}
      edit={!!currentEnclosure?.id}
      setOpen={setOpenEnclosureForm}
      //   loadEnclosure={loadEnclosure}
      submitData={!!currentEnclosure?.id ? updateEnclosureData : submitEnclosureData}
      isLoading={singleEnclosureCreatePending}
    />
  }
  
  if (openSchoolForm) {
    renderView = <SchoolCreateForm

      defaultValues={currentSchool}
      open={openSchoolForm}
      edit={!!currentSchool?.id}
      setOpen={setOpenSchoolForm}
      //   loadEnclosure={loadEnclosure}
      submitData={!!currentSchool?.id ? updateEnclosureData : submitEnclosureData}
      isLoading={singleSchoolUpdatePending}
    />
  }
  return (
    <>
      <div className={classes["home-container"]}>


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