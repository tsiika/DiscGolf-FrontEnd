import React, { Component } from 'react';
import '../App.css';

import LoginForm from './Login'

import Api from '../api/Api';

class App extends Component {

  componentDidMount(){
    fetch(Api.getApiHost())
      .then(results => {
        return console.log('Connection to API successful');
      }).then(
        console.log('Wake up.'),
      )
  }
  render() {

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 headline">
              <h1>Disc Golf App</h1>
              <h3>Let's go throw some discs!</h3>
              <p>Login or create free account under a minute and start playing right away!</p>
            </div>
          </div>

          <div className="row"> {/* insert login-wrapper div class here */}
            <div className="col-12">
            <LoginForm/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;