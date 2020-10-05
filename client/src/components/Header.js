import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './HeaderStyle.css';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (
                <div>
                    <Link to="/logout">Log out</Link>
                    <Link to="/feature">Feature</Link>
                </div>
            );
        } else {
            return (
                <div>
                    <Link to="/signup">Sign up</Link>
                    <Link to="/login">Log in</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                {this.renderLinks()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(Header);