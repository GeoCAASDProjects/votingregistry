import SimpleMap from "@renderer/components/map/SimpleMap";
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
           console.log(e)
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
     const response = await singleEnclosureMutate(id);
   
  
    }
   function clearEnclosure(){
    setCurrentEnclosure(null);
   }
   function selectLocation(){
    setOpen(false);
    setActionState("location")
   }
    
   function createForm(){
    
    setOpen(true);
    setActionState("");
   }
    
    return (
        <>
            <div style={{ flex: 1, height: "100%" }}>
                <Sidebar 
                selectLocation={selectLocation} 
                actionState={actionState}
                currentEnclosure={singleEnclosurePending && singleEnclosureData?.data} 
                singleEnclosurePending={singleEnclosurePending && singleEnclosurePending} 
                clearEnclosure={clearEnclosure} 
                isOpen={open} 
                toggleSidebar={toggleSidebar}
                createForm ={createForm}
                />
                <SimpleMap currentEnclosure={singleEnclosureData?.data?.id ?? null}   actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null}/>
            </div>

        </>

    )
}