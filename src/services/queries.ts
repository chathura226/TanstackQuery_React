import { keepPreviousData, useInfiniteQuery, useQueries, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import {getProduct, getProducts, getProjects, getTodo, getTodosIds} from "./api"
import { Product } from '../types/product';

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


//infinitescrolling
export function useProducts(){
    return useInfiniteQuery({
            queryKey: ['products'],
            queryFn: getProducts,
            initialPageParam: 0,
            getNextPageParam: (lastPage, allPages, lastPageParam) => {
                if (lastPage.length === 0) {
                    return undefined
                }
                return lastPageParam + 1;
            },
            getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
                if (firstPageParam <= 1) {
                    return undefined
                }
                return firstPageParam - 1;
            }
        }

    )
    }


    export function useProduct(id:number | null){
        const queryClient=useQueryClient();

        return useQuery({
            queryKey:['product',{id}],
            queryFn:()=>getProduct(id!),
            enabled:!!id,
            placeholderData:()=>{
                const cachedProducts=(
                    queryClient.getQueryData(['products']) as {
                        pages:Product[]|undefined;
                    })?.pages?.flat(2);

                    if(cachedProducts){
                        return cachedProducts.find((product)=>product.id===id);
                    }

            }
        })
    }