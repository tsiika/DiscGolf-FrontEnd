import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from './components/Container';
import Appbar from 'material-ui/AppBar';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <MuiThemeProvider>
        <Appbar title="DiscGolf App" />
        <Container />
        <Footer/>
      </MuiThemeProvider>       

      </div>
    );
  }
}


export default App;
