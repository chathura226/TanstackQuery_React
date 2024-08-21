import {useTodos, useTodosIds} from '../services/queries'
import {useIsFetching} from "@tanstack/react-query";

function Todo() {

    const todosIdsQuery=useTodosIds();
    const isFetching =useIsFetching()

    const todosQueries=useTodos(todosIdsQuery.data);

    // if(todosIdsQuery.isPending){
    //     return <span>loading .....</span>
    // }
    //
    // if(todosIdsQuery.isError){
    //     return <span>Error: {todosIdsQuery.error.message}</span>
    // }

  return (
    <div>
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
            </li>
        ))}
    </div>
  )
}

export default Todo