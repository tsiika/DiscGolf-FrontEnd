import React, { Component } from 'react';
import Auth from '../api/Auth';
import Redirect from 'react-router/Redirect';

/*
*   Logout - Removes authentication and redirects to login screen
*/
class Logout extends Component {
 
    constructor(props) {
        super(props);
        Auth.removeAuthentication();
    }

    render() {
        return ( <Redirect to="/" /> );
    }
}

export default Logout;
