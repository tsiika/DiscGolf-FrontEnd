import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Confirm from './Confirm';
import '../App.css';



export default class LoginForm extends Component {

  constructor() {
    super();
    this.state = {
      fireRedirect: false
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    this.setState({ fireRedirect: true })
  }

  render() {
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state

    return (
      <div>
        <form>
          <h2>This is login page.</h2>
          Username: <br/>
          <input type="text" name="username"/> <br/>
          Password: <br/>
          <input type="password" name="pwd" /><br/>
          <input type="submit" name="Submit" />
        </form>
        {fireRedirect && (
          <Redirect to={from || '/confirm'}/>
        )}
      </div>
    );
  }
}


