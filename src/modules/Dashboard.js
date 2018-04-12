import React, { Component } from 'react';

import PrevMatch from '../components/PrevMatch';
import PrevTourn from '../components/PrevTourn';
import NewGame from '../components/NewGame';
import GameStats from '../components/Statistic';


 
class App extends Component {
  render() {
    return (
      <div className="container">
      <div className="row">
        <div className="col-12">
        <p>This is dashboard.</p>
        <p>This is where you see your information and can start to play a new game.</p>
        </div>
      </div>
        <div className="row">
          <div className="col-6"><NewGame /> </div>
          <div className="col-6"><GameStats /> </div>
        </div><br/>

        <div className="row">
          <div className="col-6"> <PrevMatch /> </div>
          <div className="col-6"> <PrevTourn /> </div>
        </div>
      </div>
    );
  }
}

export default App;
