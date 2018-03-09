//UI imports will be in separate module in future 
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Container from './components/Container';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Menu, Input, Segment } from 'semantic-ui-react'

// These are just placeholder to see which "page" the user is in. 
//Will be removed in the future when routing is worknig properly.

function Site(props) {
	return <h4>You are at <i>{props.name}</i> page</h4>
}

const Home = () => (
	<div>
			<Site name="home" />
	</div>
);

const Login = () => (
	<div>
			<Site name="login" />
	</div>
);

const Register = () => (
	<div>
			<Site name="registration" />
	</div>
);

const Logout = () => (
	<div>
			<Site name="logout" />
	</div>
);

class App extends Component {
	//Sets default state to menu
	state = {}
	//Checks activity of selected item
	handleItemClick = (e, {name}) => this.setState({ activeItem: name})

	render() {

		const { activeItem } = this.state
		
		//Returns data for 'routing' from the const.
		return (
			<div className="App">
				<Menu pointing>
				<Link to="/" name="home"><Menu.Item
							name='home'
							active={activeItem === 'Home'}
							onClick={this.handleItemClick}
							> Home </Menu.Item></Link>

				<Link to="/login" name="login"><Menu.Item
							name='Login'
							active={activeItem === 'Login'}
							onClick={this.handleItemClick}
							> Sign In </Menu.Item></Link>

				<Link to="/register" name="register"><Menu.Item
							name='Registration'
							active={activeItem === 'Register'}
							onClick={this.handleItemClick}
							> Sign Up </Menu.Item></Link>

				<Menu.Menu position='right'>
					<Menu.Item>
					<Link to="/logout" name="logout"><Menu.Item
							name='Logout'
							active={activeItem === 'Logout'}
							onClick={this.handleItemClick}
							>Log out </Menu.Item></Link>
					</Menu.Item>
				</Menu.Menu>
				</Menu>
					
			<Route exact path="/" component={Home} /> 
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/logout" component={Logout} />

			<Container/>
			</div>
		)
	}
}

export default App;
