import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import '../App.css';



class App extends Component {
  render() {
    return (
    <HashRouter>
      <div>
          <h2>Thank you for registration!</h2>
            <p>We have sent you an email for confirmation, check it out!</p>
      </div>
    </HashRouter>
    );
  }
}

export default App;
