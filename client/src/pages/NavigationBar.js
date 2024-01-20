import React from 'react';
import { Link } from 'react-router-dom';

export const NavigationBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
                <li><Link to="/saved-clubs">Saved Clubs</Link></li>
                <li><Link to="/auth/register">Register</Link></li>
            </ul>
        </nav>
    );
}


export default NavigationBar;
