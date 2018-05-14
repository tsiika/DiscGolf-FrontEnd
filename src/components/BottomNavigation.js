import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconHome from 'material-ui/svg-icons/action/home';
import IconLogin from 'material-ui/svg-icons/action/input';
import IconLogout from 'material-ui/svg-icons/action/lock';
import IconDashboard from 'material-ui/svg-icons/av/web';
import Login from '../modules/Login';
import Home from '../modules/Home';


const bottomStyle = {
  position: 'fixed',
  width: "100%",
  bottom: '0px', 
};

const homeIcon = <IconHome />;
const loginIcon = <IconLogin />;
const logoutIcon = <IconLogout />;
const dashboardIcon = <IconDashboard />;


class BNavigationBar extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper style={bottomStyle}  zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <Link to="/" style={{ textDecoration: 'none' }}><BottomNavigationItem
            label="Home"
            icon={homeIcon}
            onClick={() => this.select(0) }
          /></Link>
          <Link to="/login" style={{ textDecoration: 'none' }}><BottomNavigationItem
            label="Login"
            icon={loginIcon}
            onClick={() => this.select(1)}
          /></Link>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}><BottomNavigationItem
            label="Dash Board"
            icon={dashboardIcon}
            onClick={() => this.select(2)}
          /></Link>
          
          <Link to="/logout" style={{ textDecoration: 'none', color: 'blue' }}><BottomNavigationItem
            label="Logout"
            icon={logoutIcon}
            onClick={() => this.select(3)}
          /></Link>
        
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BNavigationBar;