import {useQueries, useQuery} from "@tanstack/react-query"
import {getTodo, getTodosIds} from "./api"

export function useTodosIds(){
    return useQuery({
        queryKey:['todos'],
        queryFn:getTodosIds,
        // refetchOnWindowFocus:false,//this will prevent the query from refetching when the window regains focus

    })
}

export function useTodos(ids:(number | undefined)[]|undefined){
    return useQueries({
        queries:(ids??[]).map((id)=>{
            return {
                queryKey:['todo',id],
                queryFn:()=>getTodo(id!),
            }
        })
    })
}