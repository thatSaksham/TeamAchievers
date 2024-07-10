import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer=()=> {
  return (
    

   <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footer-content-left">
            <img className="footer-logo"src={assets.logo} alt="" />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore, cum reprehenderit? Cupiditate, pariatur? Praesentium odio quidem id dolor adipisci nesciunt doloremque sed vitae, accusantium distinctio ipsa, similique natus ut quisquam.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>

        <div className="footer-content-center">
            <h2>Company</h2>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>

        </div> 

        <div className="footer-content-right">
             <h2>Get in touch</h2>
             <ul>
                <li>+91 xxxxxxxxxx</li>
                <li>achievers@gmail.com</li>
             </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">Copyright © 2024 NIELSEN EATS. All rights reserved.





</p>
   </div>   
   
  )
}

export default Footer
