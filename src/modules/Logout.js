import React, { Component } from 'react';
//import '../App.css';
import Auth from '../api/Auth';
import Redirect from 'react-router/Redirect';

class App extends Component {
 
    constructor(props) {
        super(props);

        console.log('Removing authentication');
        Auth.removeAuthentication();
    }

    render() {
        return (
            <Redirect to="/" />
        );
    }
}

export default App;
