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
import { createPerson, deletePerson, fetchMembers, fetchPerson, updatePerson } from "@renderer/util/http/person-http";
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
  const [currentMember, setCurrentMember] = useState<{} | null>(null);
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

  const { data: singleMemberData, isPending: singleMemberPending } = useEntity('member', fetchPerson, currentMember?.id)


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


   
  const personMutations = useEntityMutations('person', 'people', {
    createFn: createPerson,
    updateFn: updatePerson,
    deleteFn: deletePerson
  });



  async function handleCreateEnclosure(data) {
    console.log(data)
    try {
      //  const response = await singleEnclosureCreateMutate(data);
      const response = await enclosureMutations.createMutation.mutateAsync(data);

      sendDataToSidebar(response.data.id);
    } catch (e) {
      console.error(e)
      
    }
  }

  async function handleUpdateEnclosure(data) {

    try {
      // const response = singleEnclosureUpdateMutate(data);

      const response = await enclosureMutations.updateMutation.mutateAsync(data)
      closeActionForm()

    } catch (e) {
      console.error(e)
      
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

      //  queryClient.refetchQueries({ queryKey: ["enclosures"] });

      queryClient.refetchQueries({ queryKey: [`enclosure/${response?.data.enclosure_id}/schools`] });
      //queryClient.refetchQueries({queryKey: ["enclosure", response?.data.enclosure_id]});

      console.log("Answer")
      console.log(response);

      closeActionForm();

    } catch (e) {
      console.error(e)
      
    }
  }

  async function handleUpdateSchool(data) {

    try {
      const response = await schoolMutations.updateMutation.mutateAsync(data)
      queryClient.refetchQueries({ queryKey: ["school", response?.data?.id] });
      // queryClient.refetchQueries({queryKey: [`enclosure/${response?.data?.enclosure_id}/schools`]});
      closeActionForm();

    } catch (e) {
      console.error(e)
      
    }
  }

  async function handleDeleteSchool(id) {

    try {
      const response = await schoolMutations.deleteMutation.mutateAsync(id)
      queryClient.refetchQueries({ queryKey: ["enclosure", response?.data?.enclosure_id] });
      queryClient.refetchQueries({ queryKey: [`enclosure/${response?.data?.enclosure_id}/schools`] });
      setCurrentSchool(null)
      closeActionForm();
    } catch (e) {

      console.error(e)

    }
  }

  async function handleCreateSector(data) {
    console.log(data)
    try {
      const response = await sectorMutations.createMutation.mutateAsync(data);
      queryClient.refetchQueries({ queryKey: ["sectors"] });
      queryClient.refetchQueries({ queryKey: ["sector", response?.data?.id] });
      closeActionForm();
      sendSectorToSidebar(response?.data?.id)
    } catch (e) {
      console.error(e)
      
    }
  }
  async function handleUpdateSector(data) {
    console.log(data)
    try {
      const response = await sectorMutations.updateMutation.mutateAsync(data)
      queryClient.refetchQueries({ queryKey: ["sectors"] });
      console.log(response?.data?.id)
      queryClient.refetchQueries({ queryKey: ["sector", response?.data?.id] });
      closeActionForm();
    } catch (e) {
      console.error(e)
      
    }
  }

  async function handleDeleteSector(id) {

    try {
      const response = await sectorMutations.deleteMutation.mutateAsync(id)
      queryClient.refetchQueries({ queryKey: ["sectors"] });
      // queryClient.refetchQueries({queryKey: ["sector", response?.data?.id]});
      closeActionForm();

    } catch (e) {
      console.error(e)

    }
  }

  async function handleCreatePerson(data) {
    console.log(data)
    try {
      const response = await personMutations.createMutation.mutateAsync(data);
    
      closeActionForm();
 
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
    //const response = await singleSectorMutate(id);

    setCurrentSector((prev) => { return { ...prev, id } });
    openAction("sector");
  }

  async function openSchool(id: number) {
    if (!open) {
      setOpen(true);
    }

    setCurrentSchool((prev) => { return { ...prev, id } });
    openAction("school");
    //const response = await singleSchoolMutate(id);


  }
  async function openMember(id: number) {
    if (!open) {
      setOpen(true);
    }

    setCurrentMember((prevMember) => { return { ...prevMember, id } });
    openAction("member");
  }
  function openForm(data) {
    setDefaultFormValues((prevValue) => { return { ...prevValue, id: null, name: null } })
    setDefaultFormValues((prevFormValues) => { return { ...prevFormValues, longitude: data.lng.toFixed(2), latitude: data.lat.toFixed(2), address: data.address } })
    if (!open) {
      //setOpen(true);
      toggleSidebar();
    }
    setActionState("enclosureCreateForm")

  }
  const [defaultSectorValues, setDefaultSectorValues] = useState({});

  function openFormSector(data) {
    if (!open) {
      setOpen(true);
    }
    // setDefaultSectorValues((prevValue)=>{return {...prevValue, id: null, name: null}})
    setDefaultSectorValues((prevValue) => { return { ...prevValue, area: JSON.stringify(data[0]) } });
    setActionState("sectorCreateForm")
  }
  function closeMemberForm() {
    closeActionForm()
  }

  function createForm() {

    if (!open) {
      //setOpen(true);
      toggleSidebar();
    }
    closeActionForm();
  }

  function memberForm() {

    if (!open) {
      setOpen(true);
    }

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
    //alert(JSON.stringify(singleSchoolData?.data))
    setDefaultSchoolValues({ ...singleSchoolData?.data })
    openAction("schoolEditForm")
  }
  function openCreateSchoolForm() {
    openAction("schoolCreateForm")
  }

  function openEditSectorForm() {
    setDefaultSectorValues({ ...singleSectorData?.data, area: JSON.stringify(singleSectorData?.data.nodes?.map((node) => [node.latitude, node.longitude])) })
    openAction("sectorEditForm")
  }

  let renderView;
  renderView = <>
    {actionState == "" && <>
      <SearchBar searchDataFunction={searchDataFunction} selectSearch={selectSearch} />
      <Button title="Añadir recintos" iconName="Add" onClick={selectLocation} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Añadir sector" iconName="Polyline" onClick={drawPolygon} style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Subir Archivos" iconName="Upload" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      {/*<Button title="Miembros" iconName="Person" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <div style={{marginLeft:"20px"}}>
      <Button title="Añadir Miembros" iconName="Add" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      <Button title="Ver Miembros" iconName="VisibilityOutlined" style={{ width: "100%", background: "#22224F", color: "#FFFFFF", margin: "5px 0px" }} />
      </div>*/}
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
        currentSector={singleSectorData?.data}
        clearSector={clearSector}
        openEnclosure={sendDataToSidebar}
        deleteData={handleDeleteSector}
        openForm={openEditSectorForm}
      />
    }
    {
      actionState == "member" && <MemberInfo singleMemberPending={singleMemberPending} currentMember={singleMemberData?.data} openSchool={openSchool} clearMember={clearMember} />

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

        defaultValues={singleSchoolData?.data}

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
        submitData={!!currentSector?.id ? handleUpdateSector : handleCreateSector}
        isLoading={!!currentSector?.id ? sectorMutations.updateMutation.isPending : sectorMutations.createMutation.isPending}
      />
    }
    {
      actionState == "memberForm" && <MemberCreateForm submitData={handleCreatePerson} closeMemberForm={closeActionForm} currentSchool={currentSchool?.id}  isLoading={!!currentMember?.id ? personMutations.updateMutation.isPending : personMutations.createMutation.isPending}/>


    }
  </>

  return (
    <>    
    <div style={{position:"relative", flex:1, alignItems: "center", alignContent: "center", height:"100%"}}>

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
      </div>
    </>

  )
}