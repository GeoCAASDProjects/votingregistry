import SimpleMap from "@renderer/components/map/SimpleMap";
import Sidebar from "@renderer/components/sidebar/Sidebar";
import { fetchEnclosure, fetchEnclosures } from "@renderer/util/http/enclosure-http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {
    const [actionState, setActionState] = useState("");
    const [open, setOpen] = useState(false);

    const [currentEnclosure, setCurrentEnclosure] = useState(null);
    const { data: enclosureData, isPending: enclosurePending, isError: enclosureIsError, error: enclosureError } = useQuery({
        queryKey: ["enclosures"],
        queryFn: ({signal})=>fetchEnclosures({signal}),
        staleTime: 5000,
        gcTime: 30000,
    });
    
    const { mutate:singleEnclosureMutate, isPending:singleEnclosurePending, isError:singleEnclosureIsError, error:singleEnclosureError } = useMutation({
        mutationFn:  fetchEnclosure,
        onSuccess: async (e) => {
            setCurrentEnclosure(e?.data);
        },
        onError: (e) => {
            setCurrentEnclosure(null);
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
                currentEnclosure={currentEnclosure} 
                singleEnclosurePending={singleEnclosurePending} 
                clearEnclosure={clearEnclosure} 
                isOpen={open} 
                toggleSidebar={toggleSidebar}
                createForm ={createForm}
                />
                <SimpleMap currentEnclosure={currentEnclosure?.id ?? null}   actionState={actionState} onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null}/>
            </div>

        </>

    )
}