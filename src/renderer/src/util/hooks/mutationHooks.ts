import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEntityMutations = (entity, queryKey, mutationFns) => {
    const queryClient = useQueryClient();

    const {createFn, updateFn, deleteFn} = mutationFns;
    const createMutation = useMutation({
        mutationFn:  createFn,
        onSuccess: async (e) => {
         
            queryClient.refetchQueries(queryKey);
           
            return e.data;
        },
        onError: (e) => {
    
          alert("Error")
        }
    })

  
    const updateMutation = useMutation(
        
        {
            mutationFn: updateFn,
            onSuccess: async (e) => {
           
                queryClient.refetchQueries({queryKey: [entity, e?.data?.id]});
                return e.data
            },
            onError: (e) => {
        
              alert("Error")
            }
        }
)


    const deleteMutation =  useMutation(
        {
            mutationFn: deleteFn,
            onSuccess: async (e) => {
              
                queryClient.refetchQueries(queryKey);
                return e.data;
                
            },
            onError: (e) => {
                console.log(e)
              alert("Error")
            }
        }
    )
 
    
      return {
        createMutation:{
            mutate: createMutation.mutate,
            mutateAsync: createMutation.mutateAsync,
            isPending: createMutation.isPending,
            isError: createMutation.isError,
            error: createMutation.error
        }, 
        updateMutation:{
            mutate: updateMutation.mutate,
            mutateAsync: updateMutation.mutateAsync,
            isPending: updateMutation.isPending,
            isError: updateMutation.isError,
            error: updateMutation.error
        }, 
        deleteMutation:{
            mutate: deleteMutation.mutate,
            mutateAsync: deleteMutation.mutateAsync,
            isPending: deleteMutation.isPending,
            isError: deleteMutation.isError,
            error: deleteMutation.error
        }}
}

export default useEntityMutations;