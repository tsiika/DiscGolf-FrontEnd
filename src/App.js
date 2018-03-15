//Imports will be in separate module in future 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import {List, ListItem} from 'material-ui/List';

import Container from './components/Container';
import AppMenu from './components/AppMenu';
import NoMatch from './components/404';
import AppBar from './components/AppBar';

import Home from './modules/Home';
import Login from './modules/Login';
import Register from './modules/Register';
import Logout from './modules/Logout';
import Confirm from './modules/Confirm';
import Dashboard from './modules/Dashboard';

import "./App.css";


class App extends Component {

	render() {
		return (
			<div className="App">
				<AppBar>
					<AppMenu/>
				</AppBar>
				<Container/>


				<Switch>
					{/*Add all routers here*/}
					<Route exact path="/" component={Home} /> 
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/logout" component={Logout} />
					<Route path="/confirm" component={Confirm} />
					<Route path="/dashboard" component={Dashboard} />

					{/*404*/}
					<Route component={NoMatch}/>
				</Switch>

			</div>
		)
	}
}

export default App;
