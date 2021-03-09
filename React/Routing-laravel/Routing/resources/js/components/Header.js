import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import About from './About';
import Home from './Home';
class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About Us</Link>
                
            </div>
        );
    }

}

export default Header;


