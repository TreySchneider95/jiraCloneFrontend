import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/Auth";


const NavBar = ()=>{

    const auth = useAuth()

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <h5 className="navbar-brand mb-0 px-3 pe-none">Task-Tracker</h5>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="nav navbar-nav">
                {auth.userEmail && <li className="nav-item active">
                    <Link to="/" className="nav-link" >Home</Link>
                </li>}
                {auth.userEmail && <li className="nav-item">
                    <Link to="/new-blog" className="nav-link">Create Ticket</Link>
                </li>}
                {!auth.userEmail && <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>}
                {!auth.userEmail && <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>}
                {auth.isAdmin && <li className="nav-item">
                    <Link to="/manage-users" className="nav-link">Manage Users</Link>
                </li>}
                {auth.userEmail && <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={()=>{
                        auth.logout()
                    }}>Log out</Link>
                </li>}
                </ul>
                <ul className="nav navbar-nav ms-auto">
                <li className="navbar-right ms-auto">
                    <p className="nav-link mb-0 pe-none" >{auth.userEmail}</p>
                </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar