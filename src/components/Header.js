import React from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Button} from 'react-bootstrap';

export default class Header extends React.Component {

    render() {
        return(
            <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                <a href="#home">DiscGolf</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavItem eventKey={1} href="#">
                Play
                </NavItem>
                <NavItem eventKey={2} href="#">
                Tournament
                </NavItem>
                <NavDropdown eventKey={3} title="Profile" id="basic-nav-dropdown">
                <MenuItem eventKey={3.1}>Overview</MenuItem>
                <MenuItem eventKey={3.2}>Preferences</MenuItem>
                 <MenuItem divider />
                <MenuItem eventKey={3.3}>Log Out</MenuItem>
                </NavDropdown>
            </Nav>
            </Navbar>

        )
    }

}