import React, { useContext, useEffect, useState } from 'react'
import './NavBar.css';
import { assets } from '../../assets/assets';
import {Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'; 

const NavBar = ({setShowLogin}) => {
  
  const [menu,setMenu]=useState("home");

  const {getTotalCartAmount}=useContext(StoreContext);
  const [showUserInfo,setShowUserInfo]=useState(false);
  const [user,setUser]=useState({});
  const token = localStorage.getItem("token");

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:3000/userinfo", {
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
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (user.username) {
      setShowUserInfo(true);
    } else {
      setShowUserInfo(false);
    }
  }, [user]);

  // useEffect(()=>{
  //   checkLoggedIn();
  //   if(showUserInfo){
  //     setShowLogin(false);
  //   }
  // },[])


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

      <ul className='navbar-menu'>
       <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
       <a href='#explore-menu' onClick={()=>setMenu("menu")}className={menu==="menu"?"active":""}>Menu</a>
       <a href='#footer' onClick={()=>setMenu("contact-us")}className={menu==="contact-us"?"active":""}>Contact us</a>

      </ul>

      <div className='navbar-right'>
        <img src={assets.search_icon} height="27px" alt=""/>

        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} height="27px" alt=""/></Link>

          <div className={getTotalCartAmount()===0?"":"dot"}>

          </div>
        </div> 

        {showUserInfo?<button>{user.username}</button>:<button onClick={()=>setShowLogin(true)}>Sign in</button>}

      </div>
        
      
    </div>
  )
}

export default NavBar