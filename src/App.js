//Imports will be in separate module in future 
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
import Courses from './modules/Courses';
import Round from './modules/round/Round';
import Admin from './modules/Admin';

import "./App.css";
import "./styles/simple-grid.css";


class App extends Component {
	state = {
		loading: true,
	};

	componentDidMount(){
		setTimeout(() => this.setState({loading: false}),1);
	}

	render() {
		const { loading } = this.state;

		if(loading) {
			return null;
		}

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
					<Route path="/courses" component={Courses} />
                    <Route path="/round" component={Round} />

                    <Route path="/admin" component={Admin} />

					{/*404*/}
					<Route component={NoMatch}/>
				</Switch>

			</div>
		)
	}
}

export default App;
