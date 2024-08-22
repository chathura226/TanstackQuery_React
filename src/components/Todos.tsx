import {useTodos, useTodosIds} from '../services/queries'
import {useIsFetching} from "@tanstack/react-query";
import {useCreateTodo, useDeleteTodo, useUpdateTodo} from "../services/mutations.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {Todo} from "../types/todo.ts";

function Todos() {

    const todosIdsQuery=useTodosIds();
    const isFetching =useIsFetching()

    const todosQueries=useTodos(todosIdsQuery.data);

    const createTodoMutation=useCreateTodo();
    const updateTodoMutation=useUpdateTodo();
    const handleCreateTodoSubmit:SubmitHandler<Todo>=(data)=>{
        createTodoMutation.mutate(data);
    }
    const handleMarkAsDoneSubmit=(data:Todo | undefined)=>{
        if(data){
            updateTodoMutation.mutate({...data,checked:true});

        }
    }


    const deleteTodoMutations=useDeleteTodo();
    const handleDeleteTodo=async(id:number)=>{
        await deleteTodoMutations.mutateAsync(id);
        console.log("success")
    }


    const {register,handleSubmit}=useForm<Todo>()

    // if(todosIdsQuery.isPending){
    //     return <span>loading .....</span>
    // }
    //
    // if(todosIdsQuery.isError){
    //     return <span>Error: {todosIdsQuery.error.message}</span>
    // }

  return (
    <div>


        <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
            <h4>New todo:</h4>
            <input {...register("title")} placeholder="Title"/>
            <br/>
            <input {...register("description")} placeholder="Description"/>
<br/>
            <input type={"submit"} disabled={createTodoMutation.isPending} value={createTodoMutation.isPending?'Creating...':'Create'}/>
        </form>


        {/*this will show the status of the query function*/}
        <p>Query Function status: {todosIdsQuery.fetchStatus}</p>
        {/*this will show the status of the query function*/}
        <p>Query data status: {todosIdsQuery.status}</p>
        {/*this will show the number of fetchings globally*/}
        <p>Global isFetching: {isFetching}</p>
        {todosIdsQuery.data?.map((id)=>(
        <p key={id}>id: {id}</p>
    ))}

        {todosQueries.map(({data})=>(
            <li key={data?.id}>
                <div>Id: {data?.id}</div>
                <span>
                    <strong>
                        Title:
                    </strong>
                    {data?.title},{" "}
                    <strong>
                        Description:
                    </strong>
                    {data?.description},{" "}
                </span>
                <button disabled={data?.checked}
                        onClick={() => handleMarkAsDoneSubmit(data)}>{data?.checked ? 'Done' : 'Mark as Done'}</button>
                {data?.id &&
                    <button onClick={() => handleDeleteTodo(data.id!)}>Delete</button>
                }
            </li>
        ))}
    </div>
  )
}

export default Todos