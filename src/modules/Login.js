import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../App.css';

var btnStyle = {
  margin: '7px'
};

class LoginForm extends Component{

  loginForm(e) {
    e.preventDefault()
    this.props.history.push('./Confirm')
  };

  render() {

    const Button = withRouter(({ history }) => (
      <RaisedButton 
       label="Register"
        type='button'
        onClick={() => {history.push('/Register') }}
        backgroundColor="#a4c639" />  
    ));

    return (
      <div>
        <form onSubmit={this.loginForm.bind(this)}>
          <h2>This is login page.</h2>
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
         
          <RaisedButton type="submit" label="Submit" style={btnStyle}  primary/>
          <Button style={btnStyle}/>
        </form>
        <navTab />
      </div>
    );
  }
}

export default withRouter(LoginForm);

