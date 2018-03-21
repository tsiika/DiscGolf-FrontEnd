import React, { Component } from 'react';
import { BrowserRouter, Redirect, withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import '../App.css';

 class RegisterForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      namef:"",
      emailaddr:"",
      emailError:"",
      username:"",
      usernameError:"",
      pwd:"",
      cpwr:"",
      pwdError:""
    }
  }

  change = e => {
    //this.props.onChange({ [e.target.name]: e.target.value });
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  registerForm(e) {
    e.preventDefault()
    this.props.history.push('/Confirm')
  }

    onSubmit = e => {
    e.preventDefault();

    const err =this.validate();
    if (!err) {
        this.props.history.push('/Confirm');
    }
  };

  validate = () => {
  let isError = false;
  const errors = {
    usernameError: "",
    pwdError: "",
    emailError: ""
  };

    if (this.state.username.length < 4 ) {
      isError = true;
      errors.usernameError = "User name should be more than 3 letters";
    }

    if (this.state.emailaddr.indexOf("@") === -1) {
      isError = true;
      errors.emailError = "Requires valid email";
    }
    /* to add the passWord validation "still working on it"
    if (this.state.pwd.value != this.state.cpwd.value) {
      isError = true;
      errors.emailError = "Password is not matched";
    }*/

    this.setState({
      ...this.state,
      ...errors
    });

    return isError;
  };

  render() {
    return (
      <div>
        <form>
        <h2>This is registration page.</h2>
        <TextField
          name="namef"
          hintText="Full Name"
          floatingLabelText="Full Name"
          value={this.state.namef}
          onChange={e => this.change(e)}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="emailaddr"
          hintText="E-mail address"
          floatingLabelText="E-mail"
          value={this.state.emailaddr}
          onChange={e => this.change(e)}
          errorText={this.state.emailError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="username"
          hintText="User Name"
          floatingLabelText="User Name"
          value={this.state.username}
          onChange={e => this.change(e)}
          errorText={this.state.usernameError}
          floatingLabelFixed
        />
        <br />
        <TextField
          name="pwd"
          type="Password"
          hintText="Password"
          floatingLabelText="Password"
          /* to add the passWord validation "still working on it"
          value={this.state.pwd}
          onChange={e => this.change(e)}
          errorText={this.state.pwdError}*/
          floatingLabelFixed
        />
        <br />
        <TextField
          name="cpwd"
          type="Password"
          hintText="Confirm Password"
          floatingLabelText="Confirm Password "
         /* to add the passWord validation "still working on it"
          value={this.state.cpwd}
          onChange={e => this.change(e)}
          errorText={this.state.pwdError}*/
          floatingLabelFixed
        />
        <br/>
        <br />
        <RaisedButton type="submit" label="Submit" onClick={e => this.onSubmit(e)} secondary/>
        </form>
      </div>

    );
  }
}

export default withRouter(RegisterForm);