import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';

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
      <button
        type='button'
        onClick={() => {history.push('/Register') }}
        > Register </button>
    ));

    return (
      <div>
        <form onSubmit={this.loginForm.bind(this)}>
          <h2>This is login page.</h2>
          Username: <br/>
          <input type="text" name="usrname"/> <br/>
          Password: <br/>
          <input type="password" name="pwd" /><br/>
          <input type="submit" name="Submit" style={btnStyle} />
          <Button style={btnStyle}/>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);

