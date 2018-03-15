import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

import Container from './Container';
import NoMatch from '../components/404';

import Home from '../modules/Home';
import Login from '../modules/Login';
import Register from '../modules/Register';
import Logout from '../modules/Logout';
import Confirm from '../modules/Confirm';
import Dashboard from '../modules/Dashboard';

export default class AppMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {open: false};
	}

	handleToggle = () => this.setState({open: !this.state.open});

	render() {

		return (
			<div>
				<RaisedButton
					label="Menu"
					onClick={this.handleToggle}
				/>
					<Drawer open={this.state.open} onRequestChange={this.toggleDrawer}>
					<Link to="/" style={{ textDecoration: 'none' }}>
								<MenuItem>
								 Home
								</MenuItem>
						</Link>

						<Link to="/login" style={{ textDecoration: 'none' }}>
								<MenuItem>
								 Login
								</MenuItem>
						</Link>

						<Link to="/register" style={{ textDecoration: 'none' }}>
								<MenuItem>
								 Register
								</MenuItem>
						</Link>

            <Link to="/logout" style={{ textDecoration: 'none' }}>
                <MenuItem>
                 Logout
                </MenuItem>
            </Link>
					</Drawer>
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
		);
	}
}



