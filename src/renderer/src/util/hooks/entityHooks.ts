import { useQuery } from "@tanstack/react-query";


const useEntity = (entity, fetchFn, id)=>{
    const {data, isPending, isError, error} = useQuery({
      queryKey: [entity, id], 
      queryFn: ()=>fetchFn(id),
       enabled: !!id,
       staleTime: 5000, 
       gcTime: 30000
    })
    ;

    return {data, isPending, isError, error}
}

export default useEntity;