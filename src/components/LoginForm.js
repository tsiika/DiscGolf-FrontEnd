import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

//import '../App.css';

var btnStyle = { margin: '30px 7px 7px 7px' };


class LoginForm extends Component{

    loginForm(e) {
        e.preventDefault()
        this.props.history.push('./Confirm')
    };
  
    render() {

        const Button = withRouter(({ history }) => (
            <RaisedButton
            label="Create account"
            type='button'
            style={btnStyle}
            onClick={() => {history.push('/register') }}
            backgroundColor="#a4c639" />
        ));

        return (
            <div>
                <form onSubmit={this.loginForm.bind(this)}>
                    <TextField
                    name="usrname"
                    hintText="User name"
                    floatingLabelText="User Name"
                    floatingLabelFixed
                    />
                    <br />
                    <TextField
                    name="pwd"
                    type="password"
                    hintText="Password"
                    floatingLabelText="Password"
                    floatingLabelFixed
                    />
                    <br />

                    <RaisedButton type="submit" label="Login" style={btnStyle}  primary />
                    <span>or</span>
                    <Button />
                </form>
            </div>
        );
    }
}

export default LoginForm;