import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <h2>Your input has been registered.</h2>
          <Link to="/"><button>OK</button></Link>
      </div>
    );
  }
}

export default App;
