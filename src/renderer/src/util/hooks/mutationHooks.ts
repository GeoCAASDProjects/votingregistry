import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEntityMutations = (entity, queryKey, mutationFns) => {
    const queryClient = useQueryClient();

    const {createFn, updateFn, deleteFn} = mutationFns;
    const createMutation = useMutation({
        mutationFn: createFn,
        onSuccess: async (e) => {
            alert("Success")
            queryClient.refetchQueries(queryKey);
              
        },
        onError: (e) => {
    
          alert("Error")
        }
    })

  
    const updateMutation = useMutation(
        
        {
            mutationFn: updateFn,
            onSuccess: async (e) => {
                alert("Success")
                queryClient.refetchQueries(queryKey);
                if (onSuccess) onSuccess(e)
            },
            onError: (e) => {
        
              alert("Error")
            }
        }
)


    const deleteMutation =  useMutation(
        {
            mutationFn: updateFn,
            onSuccess: async (e) => {
                alert("Success")
                queryClient.refetchQueries(queryKey);
                 
            },
            onError: (e) => {
        
              alert("Error")
            }
        }
    )
 
    
      return {
        createMutation:{
            mutate: createMutation.mutate,
            isPending: createMutation.isPending,
            isError: createMutation.isError,
            error: createMutation.error
        }, 
        updateMutation:{
            mutate: updateMutation.mutate,
            isPending: updateMutation.isPending,
            isError: updateMutation.isError,
            error: updateMutation.error
        }, 
        deleteMutation:{
            mutate: deleteMutation.mutate,
            isPending: deleteMutation.isPending,
            isError: deleteMutation.isError,
            error: deleteMutation.error
        }}
}

export default useEntityMutations;