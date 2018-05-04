import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import Api from '../api/Api';
import Auth from '../api/Auth';
import Redirect from 'react-router-dom/Redirect';

import '../App.css';

var btnStyle = { margin: '30px 7px 7px 7px' };

class LoginForm extends Component{

    constructor(props) {
        super(props);
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onAuthenticationSuccess = this.onAuthenticationSuccess.bind(this);
        this.onAuthenticationFailure = this.onAuthenticationFailure.bind(this);

        this.state = {
            username: '', 
            password: '',
            loading: false,
            errorMessage: ''
        };
    }

    onSubmit(event) {
        
        event.preventDefault();

        this.setState({loading: true});
        const user = { username: this.state.username, password: this.state.password };
        
        Api.authenticateUser(user, this.onAuthenticationSuccess, this.onAuthenticationFailure);
    }
    
    onInputChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    
    onAuthenticationSuccess(response) {
        
        Auth.setAuthentication(response.accessToken, response.userId);
        this.setState({loading: false,  errorMessage: ''});
    }

    onAuthenticationFailure(errorMessage) {

        if(errorMessage.includes('Invalid authentication')) {
            errorMessage = "Wrong username or password";
        } else {
            errorMessage = "Network connection problem occured";
        }
        
        this.setState({loading: false, errorMessage: errorMessage});
    }

    render() {

        let errorMessage = (this.state.errorMessage !== '') ? <span style={{color: '#900'}}>{this.state.errorMessage}</span> : '';


        return (
            
            (Auth.isAuthenticated()) ?
                <Redirect to="/dashboard" />
            :
                <div>
                    {errorMessage}
                    <form onSubmit={this.onSubmit}>
                        <TextField
                        name="username"
                        hintText="Username"
                        floatingLabelText="Username"
                        floatingLabelFixed
                        minLength="3"
                        maxLength="99"
                        required
                        value={this.state.username}
                        onChange={this.onInputChange}
                        />
                        <br />
                        
                        <TextField
                        name="password"
                        type="password"
                        hintText="Password"
                        floatingLabelText="Password"
                        floatingLabelFixed
                        minLength="4"
                        maxLength="99"
                        required
                        value={this.state.password}
                        onChange={this.onInputChange}
                        />
                        <br />
                        
                        <RaisedButton name="submitButton" type="submit" disabled={this.state.loading} label="Log in" primary style={btnStyle} />
                        
                        <p className="disclaimer">Don't have an account? <Link to="./Register">Register here.</Link></p>
                    </form>
                </div>
        );
    }
}

export default LoginForm;