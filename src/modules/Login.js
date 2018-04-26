import React, { Component } from 'react';
import { Redirect, withRouter, Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import '../App.css';


var btnStyle = {
  margin: '7px'
};

class LoginForm extends Component{
  constructor() {
    super();
  }

  loginForm(e) {
    e.preventDefault()
    this.props.history.push('./Dashboard')
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
          name="username"
          hintText="User name"
          floatingLabelText="User Name"
          floatingLabelFixed
          onChange = {this.handleChange}
        />
        <br />
        <TextField
          name="password"
          type="password"
          hintText="Password"
          floatingLabelText="Password"
          floatingLabelFixed
          onChange = {this.handleChange}
        />
        <br />
        
          <RaisedButton type="submit" value="submit" label="Submit" style={btnStyle} primary/>

          <p className="disclaimer">Don't have an account? <Link to="./Register">Register here.</Link></p>
        </form>
        <navTab />
      </div>
    );
  }
}

export default withRouter(LoginForm);

