import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import '../App.css';
import Redirect from 'react-router-dom/Redirect';

class App extends Component {

    render() {

        const loggedIn = false;

        if(loggedIn) {
            return ( <Redirect to="/dashboard" /> );
        } else {
            return (
                <div className="login-wrapper">
                    <h3>Login</h3>
                    <LoginForm />
                </div>
            );
        }
    }
}

export default App;
