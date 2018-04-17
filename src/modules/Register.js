import React, { Component } from 'react';
import RegisterForm from '../components/RegisterForm';
import Redirect from 'react-router/Redirect';

//import '../App.css';

/*
*   Register - Module
*
*/
class Register extends Component {

    constructor(props) {
        super(props);
        
        this.onUserRegistered = this.onUserRegistered.bind(this);

        this.state = {userWasRegistered: false};
    }

    onUserRegistered() {
        this.setState({userWasRegistered: true});
    }

    render() {

        const loggedIn = false;

        if(loggedIn) {
            // Is user is logged in redirect to dashboard
            return( <Redirect to="/dashboard" /> );
        } else if(this.state.userWasRegistered) {
            // If new user was registered successfully, redirect to login
            return( 
                <Redirect to={{
                    pathname: '/', 
                    state: {referrer: this.props.location, referrerMessage: 'Account was created!'}
                }} /> 
            );
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