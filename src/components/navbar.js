import {Link} from 'react-router-dom';
import './navbar.css';
import Cookies from "universal-cookie";
import { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import { useEffect } from 'react';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    // const [loggedIn, isLoggedIn] = useState(false);

    // useEffect(() => {
    //     if(user){
    //       initializeFields(user);
    //       console.log("user on useeffect usecontext:",user)
    //     }
    //   },[user]);

    //   const initializeFields = () => {
    //     setUser(UserContext);
    //   };

    const logout = () => {
        const cookies = new Cookies();
        cookies.remove("TOKEN", { path: "/" });
        localStorage.clear();
        // isLoggedIn(false);
        setUser(null);
        };
    
    const id = localStorage.getItem('id');

    return (
        <div className="navbar">
            {user  ? (
            <div className="navitems">
                <div className="nav-item">
                    <Link to="/ramen" className="item">
                        Ramens
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to="/new-ramen" className="item">
                        Add a ramen
                    </Link>
                </div>
                <div className="user-navitem">
                    User
                    <div className='nav-dropdown'>
                        <div className="dropdown-item">
                            <Link to={`/user/show/${id}`} className="item-in-dropdown">
                                Profile
                            </Link>
                        </div>
                        <div className="dropdown-item"> 
                            <a href='/' onClick={() => logout()} className="item-in-dropdown">
                                Logout
                            </a>    
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="navitems">
                <div className="nav-item">
                    <Link to="/" className="item">
                        Home
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to="/ramen" className="item">
                        Ramens
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to="/signup" className="item">
                        Signup
                    </Link>
                </div>
                <div className="nav-item">
                    <Link to="/login" className="item">
                        Login
                    </Link>
                </div>
            </div>
        )}
        </div>
    );
};

export default Navbar;