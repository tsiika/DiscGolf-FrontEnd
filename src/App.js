import React, { Component } from 'react';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Header />
        <Container/>
        
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous" />
      </div>
    );
  }
}

export default App;
