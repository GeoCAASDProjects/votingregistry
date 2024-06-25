import EnclosureCreateForm from "@renderer/components/enclosureForm/EnclosureForm";
import EnclosureInfo from "@renderer/components/enclosureInfo/EnclosureInfo";
import SimpleMap from "@renderer/components/map/SimpleMap";
import SearchBar from "@renderer/components/searchBar/SearchBar";
import Sidebar from "@renderer/components/sidebar/Sidebar";
import { createEnclosure, fetchEnclosure, fetchEnclosures } from "@renderer/util/http/enclosure-http";
import { Enclosure } from "@renderer/util/types";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";


export default function Home(): JSX.Element {
  const queryClient = useQueryClient();
    const [actionState, setActionState] = useState("");
    const [open, setOpen] = useState(false);
    const [defaultFormValues, setDefaultFormValues] = useState({});
    const [currentEnclosure, setCurrentEnclosure] = useState<Enclosure|null>(null);
    const { data: enclosureData, isPending: enclosurePending, isError: enclosureIsError, error: enclosureError } = useQuery({
        queryKey: ["enclosures"],
        queryFn: ({signal})=>fetchEnclosures({signal}),
        staleTime: 5000,
        gcTime: 30000,
    });
    
    const { 
        mutate:singleEnclosureMutate, 
        data:singleEnclosureData, 
        isPending:singleEnclosurePending, 
        isError:singleEnclosureIsError, 
        error:singleEnclosureError 
    }   = useMutation({
        mutationFn:  fetchEnclosure,
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
        mutate:singleEnclosureCreateMutate, 
        data:singleEnclosureCreateData, 
        isPending:singleEnclosureCreatePending, 
        isError:singleEnclosureCreateIsError, 
        error:singleEnclosureCreateError 
    }   = useMutation({
        mutationFn:  createEnclosure,
        onSuccess: async (e) => {
          console.log("The data")
          console.log(e.data);
          queryClient.refetchQueries({queryKey: ["enclosures"]});
          setActionState("")
          setCurrentEnclosure(e.data)
          
        },
        onError: (e) => {
         
          alert("Error")
        }
      });
    
    function toggleSidebar(){
        setOpen(currentVal=>!currentVal);
    }
   async function sendDataToSidebar(id){
    if(!open){
        toggleSidebar();
    }
    if(currentEnclosure?.id == id){
      return;
    }
     const response = await singleEnclosureMutate(id);
   
  
    }
   function clearEnclosure(){
    setCurrentEnclosure(null);
   }
   function selectLocation(){
    setOpen(false);
    setActionState("location")
   }

   function openForm(data){
   setDefaultFormValues({lng: data.lng.toFixed(2), lat: data.lat.toFixed(2), address:data.address})
   if(!open){
    setOpen(true);
   }
  if(actionState != "form"){
    setActionState("form")
  }
   
   }
    
   function createForm(){
    
    setOpen(true);
    setActionState("");
   }
    
   async function submitData(data){
 console.log(data)
    try{
      const response = singleEnclosureCreateMutate(data);
      console.log("Answer")
      console.log(response);
     
    } catch(e){
      console.error(e)
      alert(e);
    }
   }
    return (
        <>
            <div style={{ flex: 1, height: "100%" }}>
                <Sidebar 
              
                actionState={actionState}
      
             
                isOpen={open} 
                toggleSidebar={toggleSidebar}
                createForm ={createForm}
                >
                 {actionState!="form" &&  <SearchBar />}
              {    actionState=="form"  &&    <EnclosureCreateForm submitData={submitData} defaultValues={defaultFormValues} isLoading={singleEnclosureCreatePending}/>}

    
              {actionState!="form" && <EnclosureInfo  
              singleEnclosurePending={singleEnclosurePending}
                currentEnclosure={currentEnclosure} 
                clearEnclosure={clearEnclosure} 
                selectLocation={selectLocation} 
              />}
                </Sidebar>
                <SimpleMap openForm={openForm} currentEnclosure={currentEnclosure?.id ?? null}   actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null}/>
            </div>

        </>

    )
}