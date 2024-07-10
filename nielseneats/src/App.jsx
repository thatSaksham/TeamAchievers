import React, { useState } from 'react'
import NavBar from './components/NavBar/NavBar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopUp from './pages/LoginPopUp/LoginPopUp'
import Dashboard from './pages/Dashboard/Dashboard'
import useScrollToTop from './hooks/useScrollToTop.jsx'

const App = () => {

  useScrollToTop();

  const [showLogin,setShowLogin]=useState(false)

  return (
    <div style={{ height: showLogin ? '100vh' : 'auto', overflow: showLogin ? 'hidden' : 'auto' }}>

    {showLogin?<LoginPopUp setShowLogin={setShowLogin}/>:<></>}
    
    <div className='app'>
      <NavBar showLogin={showLogin} setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/cart' element={<Cart setShowLogin={setShowLogin}/>} />
        <Route path='/order' element={<PlaceOrder/>} />

      </Routes>
    </div>

    <Footer/>

    </div>
   
  )
}

export default App
