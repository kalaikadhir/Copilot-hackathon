import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';


const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [eod, setEOD] = useState('');
  const navigate = useNavigate();
  const [pending,setPending] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    // const blog = { title, body, eod };
    setPending(true);
    // fetch('http://localhost:8000/tasks', {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(blog)
    // }).then(() => {
    //   navigate('/');
    //   setPending(false);
    // })
    Axios.post("http://localhost:8000/insert",{title,body,eod})
    .then(()=>{
      setPending(false);
      navigate('/');
    })
  }

  return (
    <div className="create">
      <h2>Add New Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input 
          type="text" 
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>EOD:</label>
        <textarea
          required
          value={eod}
          onChange={(e) => setEOD(e.target.value)}
        ></textarea>
        {!pending &&<button>Add Work</button>}
        {pending &&<button disabled>Adding</button>}
      </form>
    </div>
  );
}
 
export default Create;