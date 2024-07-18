import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEntityMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = (createFn, queryKey, onSuccess) =>
        useMutation(createFn, {
            onSuccess: (data, variables, context) => {
                queryClient.refetchQueries(queryKey);
                if (onSuccess) onSuccess(data, variables), context
            },
            onError: (error) => {
                alert("Error")
            }
        })
    const updateMutation = (updateFn, queryKey, onSuccess) => useMutation(updateFn, {
        onSuccess: (data, variables, context) => {
            queryClient.refetchQueries(queryKey);
            if (onSuccess) onSuccess(data, variables, context)
        },
        onError: (error) => {
            console.error(error);
            alert("Error")
        }
    })
    const deleteMutation = (deleteFn, queryKey, onSuccess)=> useMutation(deleteFn, {
            onSuccess: (data, variables, context)=>{
                queryClient.refetchQueries(queryKey);
                if (onSuccess) onSuccess(data, variables, context)
            },
            onError: (error) => {
                console.error(error);
                alert("Error")
            }
        })
 
    
      
}

export default useEntityMutations;