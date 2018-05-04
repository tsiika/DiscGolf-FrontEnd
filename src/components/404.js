import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
          <h1>Hold your horses! <i>(404)</i></h1><br/>
            <p>Something you were looking for is not here!</p>
            <p>We strongly suggest to return home.</p>
                <Link to="/"><RaisedButton type="submit" label="Return home" primary/></Link>
      </div>
    );
  }
}

export default App;
