import EnclosureCreateForm from "@renderer/components/enclosureForm/EnclosureForm";
import EnclosureInfo from "@renderer/components/enclosureInfo/EnclosureInfo";
import SimpleMap from "@renderer/components/map/SimpleMap";
import SearchBar from "@renderer/components/searchBar/SearchBar";
import Sidebar from "@renderer/components/sidebar/Sidebar";
import { fetchEnclosure, fetchEnclosures } from "@renderer/util/http/enclosure-http";
import { UseMutationResult, useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {
    const [actionState, setActionState] = useState("");
    const [open, setOpen] = useState(false);

     interface EnclosureData {
        name: string;
        address: string;
        longitude: number;
        latitude: number;
        created_at: Date;
        updated_at: Date;
        id: number;
      }
      
     interface Enclosure {
        data: EnclosureData[];
      }
    const [currentEnclosure, setCurrentEnclosure] = useState(null);
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

   function openForm(marker){
    alert(JSON.stringify(marker))
    setOpen(true);
    setActionState("form")
   }
    
   function createForm(){
    
    setOpen(true);
    setActionState("");
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
              {    actionState=="form"  &&    <EnclosureCreateForm/>}

    
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