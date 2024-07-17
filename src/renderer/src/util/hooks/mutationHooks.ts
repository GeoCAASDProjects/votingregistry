import { useMutation, useQueryClient } from "@tanstack/react-query";

const useEntityMutations = () => {
    const queryClient = useQueryClient();

    const createMutation = (mutationFn, queryKey, onSuccess) =>
        useMutation(mutationFn, {
            onSuccess: (data, variables, context) => {
                queryClient.refetchQueries(queryKey);
                if (onSuccess) onSuccess(data, variables), context
            },
            onError: (error) => {
                alert("Error")
            }
        })
    const updateMutation = (mutationFn, queryKey, onSuccess) => useMutation(mutationFn, {
        onSuccess: (data, variables, context) => {
            queryClient.refetchQueries(queryKey);
            if (onSuccess) onSuccess(data, variables, context)
        },
        onError: (error) => {
            console.error(error);
            alert("Error")
        }
    })
    const deleteMutation = (mutationFn, queryKey, onSuccess)=>
        useMutation(mutationFn, {
            onSuccess: (data, variables, context)=>{
                queryClient.refetchQueries(queryKey);
                if (onSuccess) onSuccess(data, variables, context)
            }
        }),
        onError: (error) => {
            console.error(error);
            alert("Error")
        }
}