import React from 'react';
import './header.css';
import { HashLink } from 'react-router-hash-link';

function Header() {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your Favorite food here</h2>
                <p>Choose from a wide range of menu with finger licking tastes and also exciting offers</p>
                <HashLink smooth to="#food-display">
                    <button className='header-cursor'>View Menu</button>
                </HashLink>
            </div>
        </div>
    );
}

export default Header;
