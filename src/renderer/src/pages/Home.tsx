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
import SectorCreateForm from "@renderer/components/sectorForm/SectorForm";

export default function Home(): JSX.Element {
  const queryClient = useQueryClient();
  const [actionState, setActionState] = useState("");
  const [open, setOpen] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({});
  const [currentEnclosure, setCurrentEnclosure] = useState<Enclosure | null>(null);
  const [currentSchool, setCurrentSchool] = useState(null);
  const [currentMember, setCurrentMember] = useState(null);

  const [historyStack, setHistoryStack] = useState<string[]>([]);

  function openAction(display) {
 
    if (actionState == "drawPolygon" || actionState == "location") {
      return;
    }
  
    if (display ==actionState) {
      return;
    }
    if (!open) {
      setOpen(true);
    }
   if(actionState != null){
    setHistoryStack((prevHistoryStack) => [...prevHistoryStack, actionState]);
   }
    setActionState(display);
  }
 
  function closeActionForm() {
 
    if (!open) {
      setOpen(true);
    }
    if (historyStack.length <= 1) {
      resetHistory();
      return;
    }
    
    const previousState = historyStack[historyStack.length - 1];
    
    setHistoryStack((prevHistoryStack) => prevHistoryStack.slice(0, -1));
   
    setActionState(previousState);


  }
  useEffect(() => {
    console.log(historyStack);
    console.log(actionState)
  }, [historyStack])
  function resetHistory() {
    setHistoryStack([]);
    setActionState("")
  }

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
      
      setCurrentEnclosure(e.data);
      openAction("enclosure");
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
      openAction("school");
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
      openAction("member");
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

      //  openAction("")
      setCurrentEnclosure(null)
      closeActionForm();
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

      openAction("enclosure")


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

      if (actionState == "enclosureCreateForm") {
        closeActionForm();

      }
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
      if (actionState == "enclosureUpdateForm") {
        closeActionForm();
      }
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
      queryClient.refetchQueries({ queryKey: [`enclosure/${e?.data?.enclosure_id}/schools`] });
      closeActionForm();
      // loadEnclosure(e?.data?.enclosure_id)

    },
    onError: (e) => {

      alert("Error")
    }
  });

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

     
    setCurrentEnclosure(null);
    closeActionForm();
  }

  async function loadEnclosure(id: number) {
    clearEnclosure();
    const response = await singleEnclosureMutate(id);
    
  }

  function clearSchool() {
    closeActionForm();
    setCurrentSchool(null);
  
  }

  function clearMember() {
    setCurrentMember(null);
    closeActionForm();
  }

  function selectLocation() {
    setOpen(false);
    setActionState("location")
  }
  function drawPolygon() {
    setOpen(false);
    setActionState("drawPolygon")
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
  async function openMember(id) {
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
    setActionState("enclosureCreateForm")

  }
  const [defaultSectorValues, setDefaultSectorValues] = useState({});
  function openFormSector(data) {
    setOpen(true);

   setDefaultSectorValues((prevValue)=>{return {...prevValue, area:JSON.stringify(data)}});
    setActionState("sectorCreateForm")
  }
  function closeMemberForm() {
    closeActionForm()
  }

  function createForm() {

    setOpen(true);
    resetHistory();
  }

  function memberForm() {

    setOpen(true);

    if (actionState != "memberForm") {
      openAction("memberForm");

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
  

  function openEditForm() {
    setDefaultFormValues({ ...currentEnclosure })
  
    openAction("enclosureEditForm")
  }
  function openCreateSchoolForm() {
    openAction("schoolCreateForm")
  }

  let renderView;
  renderView = <>
    {actionState == "" && <>
      <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} />
      <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Añadir sector" iconName="Polyline" onClick={drawPolygon} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />

    </>}
    {actionState == "enclosure" && <EnclosureInfo

      singleEnclosurePending={singleEnclosurePending}
      currentEnclosure={currentEnclosure}
      clearEnclosure={clearEnclosure}
      openSchool={openSchool}
      openForm={openEditForm}
      deleteData={deleteData}
      openSchoolForm={openCreateSchoolForm}


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
      actionState == "member" && <MemberInfo currentMember={currentMember} openSchool={openSchool} clearMember={clearMember} />

    }
    {
      (actionState == "enclosureCreateForm" || actionState == "enclosureEditForm") && <EnclosureCreateForm

        defaultValues={defaultFormValues}

        edit={!!currentEnclosure?.id}
        closeForm={closeActionForm}
        //   loadEnclosure={loadEnclosure}
        submitData={!!currentEnclosure?.id ? updateEnclosureData : submitEnclosureData}
        isLoading={singleEnclosureCreatePending}
      />
    }
    {
      (actionState == "schoolCreateForm" || actionState == "schoolEditForm") && <SchoolCreateForm

        defaultValues={currentSchool}

        edit={!!currentSchool?.id}
        closeForm={closeActionForm}
        //   loadEnclosure={loadEnclosure}
        submitData={!!currentSchool?.id ? updateSchoolData : submitSchoolData}
        isLoading={!!currentSchool?.id ? singleSchoolCreatePending : singleSchoolUpdatePending}
      />
    }
    {
      (actionState == "sectorCreateForm" || actionState == "sectorEditForm") && <SectorCreateForm

        defaultValues={defaultSectorValues}

        edit={!!currentSchool?.id}
        closeForm={closeActionForm}
        //   loadEnclosure={loadEnclosure}
        submitData={!!currentSchool?.id ? updateEnclosureData : submitEnclosureData}
        isLoading={singleSchoolUpdatePending}
      />
    }
    {
      actionState == "memberForm" && <MemberCreateForm closeMemberForm={closeActionForm} currentSchool={currentSchool?.id} />


    }
  </>
   
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
        <SimpleMap openForm={openForm} openFormSector={openFormSector} currentEnclosure={currentEnclosure?.id ?? null} actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null} />
      </div>

    </>

  )
}