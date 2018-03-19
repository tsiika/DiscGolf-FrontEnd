import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

import AppMenu from './AppMenu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarTitle} from 'material-ui/Toolbar'

const paperStyle = {

};


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
                    <Link to="/login" style={{ textDecoration: 'none' }}><MenuItem>Login</MenuItem></Link>
                    <Link to="/register" style={{ textDecoration: 'none' }}><MenuItem>Register</MenuItem></Link>
                    <Link to="/dashboard" style={{ textDecoration: 'none' }}><MenuItem>Dashboard</MenuItem></Link>
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