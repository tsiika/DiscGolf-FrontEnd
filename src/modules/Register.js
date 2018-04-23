import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import Redirect from 'react-router/Redirect';
import Auth from '../api/Auth';

//import '../App.css';

/*
*   Register - Module
*
*/
class Register extends Component {

    constructor(props) {
        super(props);
        
        this.onUserRegistered = this.onUserRegistered.bind(this);
    }

    onUserRegistered() {
        console.log('onUserRegistered');
    }

    render() {

        console.log(Auth.isAuthenticated());

        const loggedIn = false;

        if(loggedIn) {
            // Is user is logged in redirect to dashboard
            return( <Redirect to="/dashboard" /> );
        } else {
            // Render registeration form
            return(
                <div>
                    <h3>Create account</h3>
                    <RegisterForm onUserRegistered={this.onUserRegistered} />
                </div>
            );
        }
    }
}


export default Register;