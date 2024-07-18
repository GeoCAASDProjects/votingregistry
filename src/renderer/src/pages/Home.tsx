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
import { createSector, deleteSector, fetchSector, fetchSectors, updateSector } from "@renderer/util/http/sector-http";
import SectorInfo from "@renderer/components/sectorInfo/SectorInfo";
import useEntityMutations from "@renderer/util/hooks/mutationHooks";
import useEntity from "@renderer/util/hooks/entityHooks";

export default function Home(): JSX.Element {
  const queryClient = useQueryClient();
  const [actionState, setActionState] = useState("");
  const [open, setOpen] = useState(false);
  const [defaultFormValues, setDefaultFormValues] = useState({});

  const [defaultSchoolValues, setDefaultSchoolValues] = useState({});
  const [currentEnclosure, setCurrentEnclosure] = useState<Enclosure | null>(null);
  const [currentSchool, setCurrentSchool] = useState<{} | null>(null);
  const [currentMember, setCurrentMember] = useState(null);
  const [currentSector, setCurrentSector] = useState<{} | null>(null);

  const [historyStack, setHistoryStack] = useState<string[]>([]);

  function openAction(display) {

    if (actionState == "drawPolygon" || actionState == "location") {
      return;
    }

    if (display == actionState) {
      return;
    }
    if (!open) {
      setOpen(true);
    }
    if (actionState != null) {
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

  const { data: sectorData, isPending: sectorPending, isError: sectorIsError, error: sectorError } = useQuery({
    queryKey: ["sectors"],
    queryFn: ({ signal }, query?) => fetchSectors({ signal }),
    staleTime: 5000,
    gcTime: 30000,
  });


  const { data: singleEnclosureData, isPending: singleEnclosurePending } = useEntity('enclosure', fetchEnclosure, currentEnclosure?.id)

  const { data: singleSchoolData, isPending: singleSchoolPending } = useEntity('school', fetchSchool, currentSchool?.id)

  const { data: singleSectorData, isPending: singleSectorPending } = useEntity('sector', fetchSector, currentSector?.id)


  useEffect(() => {
    console.log(singleEnclosureData)
  }, [singleEnclosureData]);

  const enclosureMutations = useEntityMutations('enclosure', 'enclosures', {
    createFn: createEnclosure,
    updateFn: updateEnclosure,
    deleteFn: deleteEnclosure
  });


  const sectorMutations = useEntityMutations('sector', 'sectors', {
    createFn: createSector,
    updateFn: updateSector,
    deleteFn: deleteSector
  });


  const schoolMutations = useEntityMutations('school', 'schools', {
    createFn: createSchool,
    updateFn: updateSchool,
    deleteFn: deleteSchool
  });


  /*

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
    mutate: singleSectorMutate,
    data: singleSectorData,
    isPending: singleSectorPending,
    isError: singleSectorIsError,
    error: singleSectorError
  } = useMutation({
    mutationFn: fetchSector,
    onSuccess: async (e) => {

      setCurrentSector(e.data);
      openAction("sector");
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
      setCurrentSchool(null)
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
      closeActionForm();
      setCurrentSchool(e.data);

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

  const {
    mutate: singleSectorCreateMutate,
    data: singleSectorCreateData,
    isPending: singleSectorCreatePending,
    isError: singleSectorCreateIsError,
    error: singleSectorCreateError
  } = useMutation({
    mutationFn: createSector,
    onSuccess: async (e) => {


      queryClient.refetchQueries({ queryKey: [`sectors`] });
      closeActionForm();

      loadSector(e.data.id)
      // loadEnclosure(e?.data?.enclosure_id)

    },
    onError: (e) => {

      alert("Error")
    }
  });


  const {
    mutate: singleSectorUpdateMutate,
    data: singleSectorUpdateData,
    isPending: singleSectorUpdatePending,
    isError: singleSectorUpdateIsError,
    error: singleSectorUpdateError
  } = useMutation({
    mutationFn: updateSector,
    onSuccess: async (e) => {
      alert(JSON.stringify(e));
      queryClient.refetchQueries({ queryKey: [`sectors`] });
      closeActionForm();
      loadSector(e.data.id)
      //   loadSector(e.data.id)
      // loadEnclosure(e?.data?.enclosure_id)

    },
    onError: (e) => {

      alert("Error")
    }
  });


  const {
    mutate: singleSectorDeleteMutate,
    data: singleSectorDeleteData,
    isPending: singleSectorDeletePending,
    isError: singleSectorDeleteIsError,
    error: singleSectorDeleteError
  } = useMutation({
    mutationFn: deleteSector,
    onSuccess: async (e) => {
      //  openAction("")
      setCurrentSector(null)
      queryClient.refetchQueries({ queryKey: ["sectors"] });


      closeActionForm();
    },
    onError: (e) => {
      console.log("The error inside the mutation")

    }
  });
  */


  async function handleCreateEnclosure(data) {
    console.log(data)
    try {
      //  const response = await singleEnclosureCreateMutate(data);
      const response = await enclosureMutations.createMutation.mutateAsync(data);
 
      sendDataToSidebar(response.data.id);
    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function handleUpdateEnclosure(data) {

    try {
      // const response = singleEnclosureUpdateMutate(data);

     const response = await enclosureMutations.updateMutation.mutateAsync(data)
      closeActionForm()

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function handleDeleteEnclosure(id) {
  
    try {
    const response = await enclosureMutations.deleteMutation.mutateAsync(id);
      setCurrentEnclosure(null)
     closeActionForm();
    } catch (e) {
      console.error(e)

    }
  }


  async function handleCreateSchool(data) {

    try {
      const response = await schoolMutations.createMutation.mutateAsync(data);

      queryClient.refetchQueries({ queryKey: ["enclosures"] });
  
      queryClient.refetchQueries({ queryKey: [`enclosure/${response?.data.enclosure_id}/schools`] });
      queryClient.refetchQueries({queryKey: ["enclosure", response?.data.enclosure_id]});
     
      console.log("Answer")
      console.log(response);
 
      closeActionForm();

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function handleUpdateSchool(data) {

    try {
      const response = await schoolMutations.updateMutation.mutate(data)
      console.log("Answer")
      console.log(response);

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function handleDeleteSchool(id) {
 
    try {
      const response = await schoolMutations.deleteMutation.mutateAsync(id)
       queryClient.refetchQueries({queryKey: ["enclosure", response?.data?.enclosure_id]});
       queryClient.refetchQueries({queryKey: [`enclosure/${response?.data?.enclosure_id}/schools`]});
        setCurrentSchool(null)
        closeActionForm();
    } catch (e) {
      
      console.error(e)

    }
  }

  async function handleCreateSector(data) {
    console.log(data)
    try {
      const response = await sectorMutations.createMutation.mutate(data)


    } catch (e) {
      console.error(e)
      alert(e);
    }
  }
  async function handleUpdateSector(data) {
    console.log(data)
    try {
      const response = await sectorMutations.updateMutation.mutate(data)

    } catch (e) {
      console.error(e)
      alert(e);
    }
  }

  async function handleDeleteSector(id) {

    try {
      const response = await sectorMutations.deleteMutation.mutate(data)


    } catch (e) {
      console.error(e)

    }
  }

  function toggleSidebar() {

    setOpen(currentVal => !currentVal);
  }


  function clearEnclosure() {


    setCurrentEnclosure(null);
    closeActionForm();
  }

  function clearSector() {
    setCurrentSector(null);
    closeActionForm();
  }

  async function loadEnclosure(id: number) {
    clearEnclosure();
    const response = await singleEnclosureMutate(id);

  }

  async function loadSector(id: number) {
    clearSector();
    const response = await singleSectorMutate(id);

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
    if (!currentSector?.id) {
      setCurrentSector(null);
      setDefaultSectorValues({})
    }
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
    setCurrentEnclosure((prev) => { return { ...prev, id } });
    openAction("enclosure");
    // const response = await singleEnclosureMutate(id);


  }

  async function sendSectorToSidebar(id: number) {
    if (!open) {
      toggleSidebar();
    }
    if (currentSector?.id == id) {
      return;
    }
    const response = await singleSectorMutate(id);


  }

  async function openSchool(id: number) {
    if (!open) {
      setOpen(true);
    }

    setCurrentSchool((prev) => { return { ...prev, id } });
    openAction("school");
    //const response = await singleSchoolMutate(id);


  }
  async function openMember(id) {
    if (!open) {
      setOpen(true);
    }

    const response = await singleMemberMutate(id);
  }
  function openForm(data) {
    setDefaultFormValues((prevFormValues) => { return { ...prevFormValues, longitude: data.lng.toFixed(2), latitude: data.lat.toFixed(2), address: data.address } })
    if (!open) {
      setOpen(true);
    }
    setActionState("enclosureCreateForm")

  }
  const [defaultSectorValues, setDefaultSectorValues] = useState({});
  function openFormSector(data) {
    setOpen(true);

    setDefaultSectorValues((prevValue) => { return { ...prevValue, area: JSON.stringify(data[0]) } });
    setActionState("sectorCreateForm")
  }
  function closeMemberForm() {
    closeActionForm()
  }

  function createForm() {

    setOpen(true);
    closeActionForm();
  }

  function memberForm() {

    setOpen(true);

    if (actionState != "memberForm") {
      openAction("memberForm");

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
    setDefaultFormValues({ ...singleEnclosureData?.data })

    openAction("enclosureEditForm")
  }
  function openEditSchoolForm() {
    setDefaultSchoolValues({ ...currentSchool })
    openAction("schoolEditForm")
  }
  function openCreateSchoolForm() {
    openAction("schoolCreateForm")
  }

  function openEditSectorForm() {
    setDefaultSectorValues({ ...currentSector, area: JSON.stringify(currentSector?.nodes?.map((node) => [node.latitude, node.longitude])) })
    openAction("sectorEditForm")
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
      currentEnclosure={singleEnclosureData?.data}
      clearEnclosure={clearEnclosure}
      openSchool={openSchool}
      openForm={openEditForm}
      deleteData={handleDeleteEnclosure}
      openSchoolForm={openCreateSchoolForm}


    />}
    {
      actionState == "school" && <SchoolInfo
        singleSchoolPending={singleSchoolPending}
        currentSchool={singleSchoolData?.data}
        clearSchool={clearSchool}
        openForm={openEditSchoolForm}
        memberForm={memberForm}
        deleteData={handleDeleteSchool}
        openMember={openMember}
      />
    }
    {
      actionState == "sector" && <SectorInfo
        singleSectorPending={singleSectorPending}
        currentSector={currentSector}
        openForm={openEditSectorForm}
        clearSector={clearSector}
        openEnclosure={sendDataToSidebar}
        deleteData={handleDeleteSector}
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
        submitData={!!currentEnclosure?.id ? handleUpdateEnclosure : handleCreateEnclosure}
        isLoading={!!currentEnclosure?.id ? enclosureMutations.updateMutation.isPending : enclosureMutations.createMutation.isPending}
      />
    }
    {
      (actionState == "schoolCreateForm" || actionState == "schoolEditForm") && <SchoolCreateForm

        defaultValues={singleSchoolData}

        edit={!!currentSchool?.id}
        closeForm={closeActionForm}
        currentEnclosure={currentEnclosure?.id}
        submitData={!!currentSchool?.id ? handleUpdateSchool : handleCreateSchool}
        isLoading={!!currentSchool?.id ? schoolMutations.updateMutation.isPending : schoolMutations.createMutation.isPending}
      />
    }
    {
      (actionState == "sectorCreateForm" || actionState == "sectorEditForm") && <SectorCreateForm

        defaultValues={defaultSectorValues}

        edit={!!currentSector?.id}
        closeForm={closeActionForm}
        drawPolygon={drawPolygon}
        //   loadEnclosure={loadEnclosure}
        submitData={!!currentSector?.id ? handleUpdateSector : handleCreateSector}
        isLoading={!!currentSector?.id ? singleSectorUpdatePending : singleSectorCreatePending}
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
        <SimpleMap
          openForm={openForm}
          openFormSector={openFormSector}
          currentEnclosure={currentEnclosure?.id ?? null}
          currentSector={currentSector?.id ?? null}
          actionState={actionState}
          onMarkerClick={sendDataToSidebar}
          onPolygonClick={sendSectorToSidebar}
          enclosures={(!enclosurePending && enclosureData) ?? null}
          sectors={(!sectorPending && sectorData) ?? null}
          edit={false}
          area={!!defaultSectorValues?.area && JSON.parse(defaultSectorValues?.area)}
        />
      </div>

    </>

  )
}