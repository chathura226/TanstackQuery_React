import { useTodosIds } from '../services/queries'

function Todo() {

    const todosIdsQuery=useTodosIds();

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
        {todosIdsQuery.data?.map((id)=>(
        <p key={id}>{id}</p>
    ))}</div>
  )
}

export default Todo