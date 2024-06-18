import SimpleMap from "@renderer/components/map/SimpleMap";
import Sidebar from "@renderer/components/sidebar/Sidebar";
import { fetchEnclosure, fetchEnclosures } from "@renderer/util/http/enclosure-http";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Home(): JSX.Element {

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
    
   async function sendDataToSidebar(id){
     const response = await singleEnclosureMutate(id);
   
  
    }
   
    
 
    return (
        <>
            <div style={{ flex: 1, height: "100%" }}>
                <Sidebar currentEnclosure={currentEnclosure}/>
                <SimpleMap onMarkerClick={sendDataToSidebar} enclosures={(!enclosurePending && enclosureData) ?? null}/>
            </div>

        </>

    )
}