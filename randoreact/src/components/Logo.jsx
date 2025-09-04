import React from 'react';
import logo from '../Logo-rando-ouest.png';
import { Link } from 'react-router-dom';
import '../styles/style.css';

// Dans Logo.jsx
const Logo = () => { 
    return ( 
        <div className="logo" data-testid="logo-container"> 
        <Link to="/">
            <img src={logo} alt="logo" /> 
        </Link>
        </div> 
    ); 
};

export default Logo;
