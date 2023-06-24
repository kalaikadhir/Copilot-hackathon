import Navbar from './Navbar';
import './App.css';
import Home from './home';
import Create from './create';
import Login from './Login';
import Register from './Register';
import ReactDOM from "react-dom";
import createRoot from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="content">
          
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/home" element={<Home/>}/>
            <Route exact path="/create" element={<Create/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App />
);

export default App;
