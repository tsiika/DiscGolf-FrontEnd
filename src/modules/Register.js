import React, { Component } from 'react';
import { BrowserRouter, Redirect, withRouter } from 'react-router-dom';

import '../App.css';

 class RegisterForm extends Component {

  registerForm(e) {
    e.preventDefault()
    this.props.history.push('/Confirm')
  }

  render() {
    return (
      <div>
        <form onSubmit={this.registerForm.bind(this)}>
        <h2>This is registration page.</h2>
          Full name: <br/>
          <input type="text" name="namef"/> <br/>
          Email: <br/>
          <input type="email" name="emailaddr"/> <br/>
          Username: <br/>
          <input type="text" name="username"/> <br/>
          Password: <br/>
          <input type="password" name="pwd" /><br/>
          Password again: <br/>
          <input type="password" name="pwd" /><br/>
          <input type="submit" name="Submit"/>

        </form>
      </div>

    );
  }
}

export default withRouter(RegisterForm);