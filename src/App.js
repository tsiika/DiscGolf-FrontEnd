//Imports will be in separate module in future 
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import {List, ListItem} from 'material-ui/List';

import Container from './components/Container';

import NoMatch from './components/404';
import AppBar from './components/AppBar';
import AddCourseForm from './components/AddCourseForm';

import BNavigationBar from './components/BottomNavigation'


import fakeAuth from './modules/Login';


import Home from './modules/Home';
import Login from './modules/Login';
import Courselist from './modules/Courselist';
import Register from './modules/Register';
import Logout from './modules/Logout';
import Confirm from './modules/Confirm';
import Dashboard from './modules/Dashboard';

import Courses from './modules/Courselist';
//import Round from './modules/Round';
import CourseSelection from './components/CourseSelection';
import PlayerSelection from './components/PlayerSelection';
import Scorecard from './modules/ScoreCard';

import "./App.css";
import "./styles/simple-grid.css";
//import API from '../src/api/axiosAPI';

const API = 'https://flatbread-api.herokuapp.com/';

class App extends Component {
	state = {
		loading: true,
		response: ''
	};

	

	componentDidMount(){
		setTimeout(() => this.setState({loading: false}),1);

		this.callAPI()
			.then(res => this.setState({response: res.express}))
			.catch(err => console.log(err));
	}

	callAPI = async () => {
		const response = await fetch(API);
		const body = await response.json();

		if(response.status !== 200) {
			throw Error(body.message);
			return body;
			this.setState = true;
		} else {
			this.setState = false;
		}
	}

	render() {
		const { loading } = this.state;

		if(loading) {
			return null;
		}

		return (
			<div className="App">
				<AppBar />
				<Container/>
				
				<Switch>
					{/*Add all routers here*/}
					<Route exact path="/" component={Home} /> 
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route sensitive path="/courselist" component={Courselist}/>
					<Route sensitive path="/logout" component={Logout} />
					<Route sensitive path="/dashboard" component={Dashboard} />
					<Route sensitive path="/AddCourseForm" component={AddCourseForm} />

                    <Route sensitive exact path="/round/course" component={CourseSelection} /> 
					<Route sensitive exact path="/round/players" render={(props) => <PlayerSelection {...props} />} />                   
                    <Route sensitive exact path="/round/scorecard" render={(props) => {
                        return <Scorecard course={props.location.state.course} players={props.location.state.players} /> 
                    }} />




					{/*404*/}
					<Route component={NoMatch}/>
				</Switch>
				<BNavigationBar />
			</div>
		)
	}
}

export default App;
