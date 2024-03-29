// Header.js

import React from 'react';

const Header = () => {
    return (
        <header id="header" className="header">
            <div className="logo">Welcome Farmer</div>
            <nav className="navigation-menu">
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#orders">Orders</a></li>
                    <li><a href="#resources">Resources</a></li>
                    <li><a href="#assistance">Assistance</a></li>
                    <li><a href="#logout">Logout</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
