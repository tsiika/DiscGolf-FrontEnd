import React, { Component } from 'react';
import '../App.css';

import LoginForm from './Login'

import API from '../api/axiosAPI';

class App extends Component {

  componentDidMount(){
    fetch(API)
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
              <p>Amet sint aliquip elit ut non ea reprehenderit exercitation id Lorem in ad excepteur officia. 
                Amet sint tempor fugiat mollit aute Lorem laboris laborum reprehenderit ut consectetur aliquip.
                Non duis esse officia ea reprehenderit esse pariatur labore duis labore magna. 
                Nulla dolore sit veniam adipisicing nisi velit aute ullamco incididunt.</p>
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