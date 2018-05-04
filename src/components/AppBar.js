import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Auth from '../api/Auth';


import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

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


    render() {

        // Links shown only for authenticated user
        let links = ()=>{
            if(Auth.isAuthenticated()) {
                return (
                    <div>
                        <Link to="/dashboard" style={{ textDecoration: 'none' }}><MenuItem>Dashboard</MenuItem></Link>
                        <Link to="/courselist" style={{ textDecoration: 'none' }}><MenuItem>Courses</MenuItem></Link>
                        <Link to="/logout" style={{ textDecoration: 'none' }}><MenuItem>Logout</MenuItem></Link>
                    </div>
                );
            }
        }

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
                    {links()}
                </Drawer>
                <Paper style={paperStyle} zDepth={5}>
                </Paper>
            </div>
        );
    }
}

export default AppBarC;