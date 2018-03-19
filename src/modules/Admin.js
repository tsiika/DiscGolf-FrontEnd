import React, { Component } from 'react';
import Api from '../api/Api';
import '../App.css';
import '../Admin.css';

//import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
  } from 'material-ui/Table';

import { TextField, RaisedButton } from 'material-ui';


class Admin extends Component {

    constructor(props) {
        super(props);

        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.onUsersReceived = this.onUsersReceived.bind(this);
        this.onUserSaved = this.onUserSaved.bind(this);
        this.onCoursesReceived = this.onCoursesReceived.bind(this);

        this.state = { users: [], courses: [] };
    }
    
    fetchUsers() {
        let usersPromise = Api.fetchUsers();

        usersPromise.then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            this.onUsersReceived(jsonResponse);
        })
        .catch(reason => {
            console.error(reason);
        });
    }

    fetchCourses() {
        let coursesPromise = Api.fetchCourses();
        
        coursesPromise.then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            this.onCoursesReceived(jsonResponse);
        })
        .catch(reason => {
            console.error(reason);
        });
    }

    onUsersReceived(_users) {
        this.setState({users: _users});
    }

    onCoursesReceived(_courses) {
        this.setState({courses: _courses});
    }

    onUserSaved(result) {
        this.fetchUsers();
    }


    componentDidMount() {
        this.fetchUsers();
        this.fetchCourses();
    }

    render() {
        return (
            <div className="Admin">
                <h2>Admin</h2>

                <div className="flex-grid">
                    
                    <div className="row">
                        <div className="col">
                            <h2>Users</h2>
                            <UserTable users={this.state.users} />
                        </div>
                        <div className="col">
                            <h2>Add user</h2>
                            <UserForm postUserCallback={this.onUserSaved} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Courses</h2>
                            <CourseTable courses={this.state.courses} />
                        </div>
                        <div className="col">
                            <h2>Add course</h2>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

class UserTable extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        let users = this.props.users;
        let tableRows = '';

        if(users && users.length > 0) {
            
            tableRows = users.map((user, index) => {
                return (
                    
                    <TableRow key={index}>
                        <TableRowColumn>{user._id}</TableRowColumn>
                        <TableRowColumn>{user.username}</TableRowColumn>
                        <TableRowColumn>{user.email}</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return(
            <Table selectable={false} multiSelectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableHeaderColumn>username</TableHeaderColumn>
                        <TableHeaderColumn>email</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

class CourseTable extends Component {
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        let courses = this.props.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => { 
                return (
                    
                    <TableRow key={index}>
                        <TableRowColumn>{course._id}</TableRowColumn>
                        <TableRowColumn>{course.name}</TableRowColumn>
                        <TableRowColumn>{course.description}</TableRowColumn>
                        <TableRowColumn>{course.fairways.length}</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return(
            <Table selectable={false} multiSelectable={false}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableHeaderColumn>name</TableHeaderColumn>
                        <TableHeaderColumn>description</TableHeaderColumn>
                        <TableHeaderColumn>fairways</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

/*
    UserForm

    props {
        TODO: Implement postUser as props function
        postUserCallback: function()    // Optional callback function for posting user.
    }
*/
class UserForm extends Component {
    
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postUserCallback = props.postUserCallback || this.onPostUserSucces.bind(this);
        //this.onPostUserSucces = this.onPostUserSucces.bind(this);

        this.state = { username: '', email: '', password: '' };
    }

    handleSubmit(event) {
        
        event.preventDefault();

        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        
        let userPromise = Api.postUser(user);

        userPromise
        .then( response => response.json() )
        .then( jsonResponse => this.postUserCallback(jsonResponse) )
        .catch( reason => console.error(reason) );
        
    }

    onPostUserSucces(result) {
        console.log('onPostUserSuccess');
    }

    handleInputChange(event) { 
        // Note: Using 'computed property' (ES2015) names for setting the state object
        this.setState({[event.target.name]: event.target.value});
    }

    render() {

        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField hintText="Username" id="username" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                </div>
                <div>
                    <TextField hintText="Email" id="email" name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
                </div>
                <div>
                    <TextField hintText="Password" id="password" name="password" type="text" className="form-control" value={this.state.password} onChange={this.handleInputChange} />
                </div>
                <div>
                    <RaisedButton type="submit" label="Add" />
                </div>
            </form>
        );
    }
}


export default Admin;
