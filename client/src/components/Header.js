import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/signup">Sign up</Link>
                <Link to="/login">Log in</Link>
                <Link to="/logout">Log out</Link>
                <Link to="/feature">Feature</Link>
            </div>
        );
    }
}

export default Header;