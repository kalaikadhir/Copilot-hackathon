import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div>
            <nav>
                <ul className="nav">
                    <h1>ToDo List</h1>
                    <div className="links">
                        <Link to="/">Home</Link>
                        <Link to="/create">New Work</Link>
                    </div>
                </ul>
            </nav>
        </div>
    );
}
 
export default Navbar;
