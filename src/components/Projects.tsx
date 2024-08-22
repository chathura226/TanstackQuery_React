import {useState} from "react";
import {useProjects} from "../services/queries.ts";

function Projects() {

    const [page,setPage]=useState(1);

    const {data,isPending,error,isError,isPlaceholderData,isFetching}=useProjects(page);

    return (
        <div>
            {isPending ?(
                <div>loading..</div>
            ):isError?(
                <div>Error: {error.message}</div>
            ):(
                <div>
                    {data.map((project) => (
                        <div key={project.id}>
                            <h3>{project.name}</h3>
                        </div>
                    ))}
                    <span>Current page: {page}</span>
                    <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>Prev. page</button>{" "}
                    <button onClick={() =>{
                        if(!isPlaceholderData){
                            setPage((old)=>old+1);
                    } }} disabled={isPlaceholderData}>Next page</button>
                    {isFetching ? <span> Loading...</span> : null}{" "}
                </div>
            )}


        </div>
    );
}

export default Projects;