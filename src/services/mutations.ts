import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Todo} from "../types/todo.ts";
import {createTodo, deleteTodo, updateTodo} from "./api.ts";

export function useCreateTodo(){

    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:Todo)=> createTodo(data),
        onMutate:()=>{
            console.log("mutate")
        },
        onError:()=>{
            console.log("error")
        },
        onSuccess:()=>{
            console.log("success")
        },

        onSettled:async (data,error,variables)=>{//what to run after the mutation whether its a sucess or error
            //data : output on sucess
            //error : output on error
            //variables : input data
            console.log("settled")
            if(error) {
                console.log("error")
            }else{
                //invalidate  the query with the given key to refetch the data
                await queryClient.invalidateQueries({queryKey:['todos']})
            }
        }

    })
}



export function useUpdateTodo(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(data:Todo)=>updateTodo(data),
        onSettled:async (data,error,variables)=> {
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({queryKey: ['todos']})
                await queryClient.invalidateQueries({queryKey: ["todo", {id: variables.id}],
                })
            }
        }
    })

}

export function useDeleteTodo(){
    const queryClient=useQueryClient();

    return useMutation({
        mutationFn:(id:number)=>deleteTodo(id),
        onSettled:async (data,error,variables)=>{
            if(error){
                console.log(error)
            }else{
                await queryClient.invalidateQueries({queryKey:['todos']})
                await queryClient.invalidateQueries({queryKey:['todo',{id:variables}]})
            }
        }
    })
}