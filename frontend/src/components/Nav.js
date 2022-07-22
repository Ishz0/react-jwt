import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }
    return(
        <div>
            {
                auth ?

                    <ul className="nav-ul">
                        <li><Link to="/">Shows</Link></li>
                        <li><Link to="/add">Add Shows</Link></li>
                        <li><Link to="/update"> Update Shows</Link></li>
                        <li> <Link onClick={logout} to="/signup">Logout ({ JSON.parse(auth).name})</Link></li>
                    </ul>
                    :
                    <ul className="nav-ul nav-right">
                        <li> <Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav;