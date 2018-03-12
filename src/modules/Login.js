import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../App.css';



export default class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      fireRedirect: false
    }
  }

  loginForm = (e) => {
    e.preventDefault()
    this.setState({ fireRedirect: true })
  }

  render() {
    const { from } = this.props.location.state || '/Login'
    const { fireRedirect } = this.state

    return (
      <div>
        <form onSubmit={this.loginForm}>
          <h2>This is login page.</h2>
          Username: <br/>
          <input type="text" name="usrname"/> <br/>
          Password: <br/>
          <input type="password" name="pwd" /><br/>
          <input type="submit" name="Submit" />
        </form>
        {fireRedirect && (
          <Redirect to={from || './Confirm'}/>
        )}
      </div>
    );
  }
}


