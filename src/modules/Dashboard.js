import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

import PrevMatch from '../components/PrevMatch';
import PrevTourn from '../components/PrevTourn';
import NewGame from '../components/NewGame';
import GameStats from '../components/Statistic';
import SelectPlayers from '../components/SelectPlayers'


 
class App extends Component {
  render() {
    return (
      <div class="container">
      <div class="row">
        <div class="col-12">
        <p>This is dashboard.</p>
        <p>This is where you see your information and can start to play a new game.</p>
        </div>
      </div>
        <div class="row">
          <div class="col-6"><NewGame /> </div>
          <div class="col-6"><GameStats /> </div>
        </div><br/>

        <div class="row">
          <div class="col-6"> <PrevMatch /> </div>
          <div class="col-6"> <PrevTourn /> </div>
        </div>
      </div>
    );
  }
}

export default App;
