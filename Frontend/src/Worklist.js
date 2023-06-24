

const handleDelete=(id)=>{
    fetch("http://localhost:8000/delete/"+id,{
        method: 'DELETE'
    }).then(()=>{
        window.location.reload(false);
    })
};


const Worklist = ({tasks}) => {

   
    return ( 
        <div >
            {tasks.map( task=> (
                <div className="work-preview">
                <h1>{task.title }</h1>
                <p>{task.body}</p>
                <div className="foot">
                <h3>{"EOD: "+task.eod}</h3>
                <button onClick={()=>handleDelete(task._id)}>Done</button>
                </div>
                </div>
                
            ))}
        </div>
     );
}
 
export default Worklist;