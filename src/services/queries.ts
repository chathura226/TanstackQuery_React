import {keepPreviousData, useQueries, useQuery} from "@tanstack/react-query"
import {getProjects, getTodo, getTodosIds} from "./api"

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
                queryKey:['todo', {id}],
                queryFn:()=>getTodo(id!),
            }
        })
    })
}

//for paginations
export function useProjects(page:number){
    return useQuery({
        queryKey:['projects', {page}],
        queryFn:()=>getProjects(page),
        placeholderData:keepPreviousData, //while next page data is loading, keep old data
    })
}