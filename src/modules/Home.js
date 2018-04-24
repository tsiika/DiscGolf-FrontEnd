import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
//import '../App.css';
import Redirect from 'react-router-dom/Redirect';
import Auth from '../api/Auth';

class App extends Component {

    render() {

        return( 
            (Auth.isAuthenticated()) ?
                <Redirect to="/dashboard" />
            :
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <LoginForm />
                </div>
        );
    }
}

export default App;
