import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
//import '../App.css';
import Redirect from 'react-router-dom/Redirect';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.location);
    }

    render() {

        const loggedIn = false;

        return( 
            (loggedIn) ?
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
