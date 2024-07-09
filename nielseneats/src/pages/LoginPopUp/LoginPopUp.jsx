import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import axios from 'axios'; 

const LoginPopUp = ({setShowLogin}) => {

    const navigate = useNavigate();
    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleUsername =(event) =>{
      setUsername(event.target.value);
   }

   const handleEmail =(event) =>{
    setEmail(event.target.value);
   }

   const handlePassword = (event) =>{
      setPassword(event.target.value);
   }
  
   const handleRegisterData  = async (event) =>{
      try{
          event.preventDefault();
          const response =await axios.post("https://teamachievers-1.onrender.com/register",{
              username:username,
              password:password,
              email:email,
          });
          if(response.status === 201){
              console.log("user registered");
              setCurrentState("Login")
          }
      } catch(error){
        console.log(error);
          alert('Error create a user. Try again!');
      }
   }

   const handleLoginData = async (event) => {
    try{
        event.preventDefault();
        const res = await axios.post("https://teamachievers-1.onrender.com/login",{
            username:username,
            password:password,
        })
        if(res.status === 200){
            localStorage.setItem("token",res.data);
            setShowLogin(false);
            navigate(0);
        }
    } catch (error){
        alert("Invalid Credentials");
    }
 }
    const [currentState,setCurrentState]=useState("Sign up")

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={currentState==='Sign up'?handleRegisterData:handleLoginData}>
        <div className='login-popup-title'>
            <h2>{currentState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>

        <div className='login-popup-inputs'>
          
            <input type="text" placeholder='Your Name' value={username} onChange={handleUsername} required className='input' />
            {currentState==="Login"?<></>:<input type="email" placeholder='Your email' value={email} onChange={handleEmail} required className='input' />}
            <input type="password" placeholder='Password' value={password} onChange={handlePassword} required classname='input' />
        </div>

        <button type='submit'>{currentState==="Sign up"?"Create account":"Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By Continuing, I Agree to the terms of use and Privacy Policy</p>
        </div>
        {currentState==="Login"
        ?<p>Create a New Account ? <span onClick={()=>setCurrentState("Sign Up")}>Click Here</span></p>
        :<p>Already have an Account ? <span onClick={()=>setCurrentState("Login")}>Login Here</span></p>

        }
      </form>
    </div>
  )
}

export default LoginPopUp