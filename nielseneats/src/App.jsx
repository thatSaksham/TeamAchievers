import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Login from './pages/Login/Login'
import Login from './pages/Register/Register'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
// import LoginPopUp from './components/LoginPopUp/LoginPopUp'

const App = () => {

  const [showLogin,setShowLogin]=useState(false)

  return (
    <>

    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    
    <div className='app'>
      <NavBar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} /> */}
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />

      </Routes>
    </div>

    <Footer/>

    </>
   
  )
}

export default App
