//Imports will be in separate module in future 
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Container from './components/Container';
import AppMenu from './components/AppMenu';
import NoMatch from './components/404';
import AppBar from './components/AppBar';

import Home from './modules/Home';
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
                    {/* TODO: Create 'wrapper' route ie. 'PrivateRoute', which checks for authentication and redirects by it. 
                        At the moment check is done on every component separetly. See react-router-dom documentation...
                    */}
					{/*Add all routers here*/}
					<Route exact path="/" component={Home} /> 
					<Route sensitive path="/register" component={Register} />
					<Route sensitive path="/logout" component={Logout} />
					<Route sensitive path="/confirm" component={Confirm} />
					<Route sensitive path="/dashboard" component={Dashboard} />
					<Route sensitive path="/courses" component={Courses} />
                    <Route sensitive path="/round" component={Round} />

                    <Route path="/admin" component={Admin} />

					{/*404*/}
					<Route component={NoMatch}/>
				</Switch>

			</div>
		)
	}
}

export default App;
