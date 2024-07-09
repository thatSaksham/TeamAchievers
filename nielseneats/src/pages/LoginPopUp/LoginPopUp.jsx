import React, { useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'

const LoginPopUp = ({setShowLogin}) => {

    const [currentState,setCurrentState]=useState("Sign up")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className='login-popup-title'>
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className='login-popup-inputs'>
          {currentState==="Login"?<></>:<input type="text" placeholder='Your Name' required />}
            <input type="email" placeholder='Your email' required />
            <input type="password" placeholder='Password' required />
        </div>

        <button>{currentState==="Sign up"?"Create account":"Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing, i agree to the terms of use and privacy policy</p>
        </div>
        {currentState==="Login"
        ?<p>create a new account? <span onClick={()=>setCurrentState("Sign Up")}>click here</span></p>
        :<p>already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p>

        }
      </form>
    </div>
  )
}

export default LoginPopUp