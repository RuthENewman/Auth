import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
    componentDidMount() {
        this.props.signout();
    }
    render() {
        return <div>You are now signed out.</div>
    }
}

export default connect(null, actions)(Signout);