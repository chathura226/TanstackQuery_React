import { useQuery } from "@tanstack/react-query"
import { getTodosIds } from "./api"

export function useTodosIds(){
    return useQuery({
        queryKey:['todos'],
        queryFn:getTodosIds,
        // refetchOnWindowFocus:false,//this will prevent the query from refetching when the window regains focus

    })
}