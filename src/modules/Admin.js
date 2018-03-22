import React, { Component } from 'react';
import Api from '../api/Api';
import '../App.css';
import '../Admin.css';

import { Link } from 'react-router-dom';

import UserTable from '../components/admin/UserTable';
import CourseTable from '../components/admin/CourseTable';
import UserForm from '../components/admin/UserForm';

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
import CourseForm from '../components/admin/CourseForm';
import { RadioButton } from 'material-ui/RadioButton';


class Admin extends Component {

    constructor(props) {
        super(props);

        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchCourses = this.fetchCourses.bind(this);
        this.onUsersReceived = this.onUsersReceived.bind(this);
        this.onUserSaved = this.onUserSaved.bind(this);
        this.onCoursesReceived = this.onCoursesReceived.bind(this);
        this.postUser = this.postUser.bind(this);
        this.postCourse = this.postCourse.bind(this);
        this.onCourseSaved = this.onCourseSaved.bind(this);
        this.onUsersSelected = this.onUsersSelected.bind(this);
        this.onCoursesSelected = this.onCoursesSelected.bind(this);

        this.newRoundHandler = this.newRoundHandler.bind(this);

        this.state = { 
            users: [], 
            courses: [],
            selectedUsers: [],
            selectedCourses: [], 
            newRoundEnabled: false 
        };
    }
    
    componentDidMount() {
        this.fetchUsers();
        this.fetchCourses();
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

    postUser(user) {
        let userPromise = Api.postUser(user);

        userPromise
        .then( response => response.json() )
        .then( jsonResponse => this.onUserSaved(jsonResponse) )
        .catch( reason => console.error(reason) );
    }

    fetchCourses() {
        let coursesPromise = Api.fetchCourses(false);
        
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

    postCourse(course) {
        let coursePromise = Api.postCourse(course);

        coursePromise
        .then( response => response.json() )
        .then( jsonResponse => this.onCourseSaved(jsonResponse) )
        .catch( reason => console.error(reason) );
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

    onCourseSaved(result) {
        this.fetchCourses();
    }

    onUsersSelected(selections) {

        if(selections.length > 0) {
            let selectedUsers = selections.map(i => this.state.users[i]);
            let newRoundEnabled = (this.state.selectedCourses.length > 0) ? true : false;
            this.setState({selectedUsers: selectedUsers, newRoundEnabled: newRoundEnabled});
        } else {
            this.setState({selectedUsers: [], newRoundEnabled: false});
        }
    }

    onCoursesSelected(selections) {

        if(selections.length > 0) {
            let selectedCourses = selections.map(i => this.state.courses[i]);
            let newRoundEnabled = (this.state.selectedUsers.length > 0 ) ? true : false;
            this.setState({selectedCourses: selectedCourses, newRoundEnabled: newRoundEnabled});
        } else {
            this.setState({selectedCourses: [], newRoundEnabled: false});
        }
    }

    onClickNewRound() {
        console.log('New round....');
    }

    newRoundHandler(param) {
        console.log('newRoundHandler');
        console.log(param.target);
        console.log(param.match);
        console.log(param.target.match);
        
    }

    render() {

        let linkParams = {pathname: 'scorecard', params:{foo: 'bar'}};

        return (
            <div className="Admin">
                <h2>Admin</h2>
                <div className="flex-grid">
                    <div className="row">
                        <div className="col">
                            <h2>Users</h2>
                            <UserTable users={this.state.users} onUsersSelected={this.onUsersSelected} />
                        </div>
                        <div className="col">
                            <h2>Add user</h2>
                            <UserForm postData={this.postUser} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h2>Courses</h2>
                            <CourseTable courses={this.state.courses} onCoursesSelected={this.onCoursesSelected} />
                        </div>
                        <div className="col">
                            <h2>Add course</h2>
                            <CourseForm postData={this.postCourse} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

//<RaisedButton id="newRoundButton" label="New Round" primary={true} disabled={!this.state.newRoundEnabled} />
// to={{path: '/scorecard', state: {statePropsi: 'foobar'}}}


export default Admin;
