import useFetch from "./useFecth";
import Worklist from "./Worklist";

const Home = () => {

    const {data: tasks,error,isPending} = useFetch("http://localhost:8000/read");
    return ( 
        <div>
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }
            { tasks && <Worklist tasks={tasks} /> }
        </div>
     );
}
 
export default Home;

