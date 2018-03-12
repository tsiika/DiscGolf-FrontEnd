import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import '../App.css';



class App extends Component {
  render() {
    return (
    <HashRouter>
      <div>
        <form>
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
          <input type="submit" name="Submit" />
        </form>
      </div>
    </HashRouter>
    );
  }
}

export default App;
