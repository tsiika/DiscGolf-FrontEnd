import React, { Component } from 'react';

import Home from './Home';
import PrevMatch from '../components/PrevMatch';
import PrevTourn from '../components/PrevTourn';
import NewGame from '../components/NewGame';
import GameStats from '../components/Statistic';

class App extends Component {
  render() {
    return (
      <div>
          <h1>Welcome *user*!</h1>
        <Home/><br/>
        <NewGame /><br/>
        <GameStats /><br/>
        <PrevMatch /><br/>
        <PrevTourn />
      </div>
    );
  }
}

export default App;
