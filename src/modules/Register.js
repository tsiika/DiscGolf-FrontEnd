import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import '../App.css';



class App extends Component {
  render() {
    return (
    <BrowserRouter>
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
    </BrowserRouter>
    );
  }
}

export default App;
