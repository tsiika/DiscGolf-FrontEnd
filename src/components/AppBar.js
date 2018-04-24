import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import Auth from '../api/Auth';


const paperStyle = {};

class AppBarC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "open": false,
            "show": null
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

render(){
    /*
    let logout = (Auth.isAuthenticated()) ?
        <Link to="/logout" style={{ textDecoration: 'none' }}><MenuItem>Logout</MenuItem></Link> 
        : 
        '';
    */

    return(
        <div>
                <AppBar
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    title="DiscGolf App"
                    onLeftIconButtonClick={this.handleToggle}
                />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({open})}>

                    <AppBar title="Menu"/>
                    <Link to="/" style={{ textDecoration: 'none' }}><MenuItem>Home</MenuItem></Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}><MenuItem>Register</MenuItem></Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}><MenuItem>Dashboard</MenuItem></Link>
                    <Link to="/courses" style={{ textDecoration: 'none' }}><MenuItem>Courses</MenuItem></Link>
                    <Link to="/logout" style={{ textDecoration: 'none' }}><MenuItem>Logout</MenuItem></Link>
                    <Link to="/admin" style={{ textDecoration: 'none' }}><MenuItem>Admin</MenuItem></Link>

                </Drawer>
                <Paper style={paperStyle} zDepth={5}>

                </Paper>
        </div>
    );
}

}

export default AppBarC;