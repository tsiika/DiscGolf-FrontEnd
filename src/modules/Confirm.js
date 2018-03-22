import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

import Dashboard from './Dashboard';

class App extends Component {
  render() {
    return (
      <div>
          <h2>Your input has been registered.</h2>
          <Link to="/Dashboard"><RaisedButton label="OK" backgroundColor="#a4c639" /></Link>
      </div>
    );
  }
}

export default App;
