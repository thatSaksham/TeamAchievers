import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css';
import { assets } from '../../assets/assets';
import {Link, useNavigate, useLocation} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'; 

const NavBar = ({showLogin,setShowLogin}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const [menu,setMenu]=useState("home");

  const {getTotalCartAmount}=useContext(StoreContext);
  const [showUserInfo,setShowUserInfo]=useState(false);
  const [user,setUser]=useState({});
  const token = localStorage.getItem("token");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("https://teamachievers-1.onrender.com/userinfo", {
        headers: {
          Authentication: `Bearer ${token}`,
        },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    if(token){
      fetchUserDetails();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/');
    navigate(0);
  };

  useEffect(() => {
    if (user.username) {
      setShowUserInfo(true);
    } else {
      setShowUserInfo(false);
    }
  }, [user]);

  const navbarClass = location.pathname === '/cart' ? 'navbar non-fixed-navbar' : showLogin==true?'navbar non-fixed-navbar':'navbar fixed-navbar';

  return (
    <div className={navbarClass}>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className='navbar-menu'>
       <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
       <a href='#explore-menu' onClick={()=>setMenu("menu")}className={menu==="menu"?"active":""}>Menu</a>
       <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>Contact us</a>

      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} style={{ maxHeight: '32px' }} alt=""/>

        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} style={{ maxHeight: '32px' }} alt=""/></Link>

          <div className={getTotalCartAmount()===0?"":"dot"}>

          </div>
        </div> 

        {showUserInfo?
        <div className="dropdown">
        <button onClick={handleOpen}>{user.username}</button>
        {open ? (
          <ul className="menu">
            <li className="menu-item">
              {user.isAdmin?<Link to='/dashboard'><button className='dropbutton'>Dashboard</button></Link>:<button className='dropbutton'>Orders</button>}
            </li>
            <li className="menu-item">
              <button className='dropbutton' onClick={handleLogout}>Sign Out</button>
            </li>
          </ul>
        ) : null}
      </div>
        :<button onClick={()=>setShowLogin(true)}>Sign in</button>}

      </div>
        
      
    </div>
  )
}

export default NavBar