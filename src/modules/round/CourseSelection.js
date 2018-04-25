import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../../components/404';

import Api from  '../../api/Api';
import Auth from '../../api/Auth';

import '../../App.css';
import '../../Round.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

import RoundModel from '../../models/RoundModel';
import Redirect from 'react-router-dom/Redirect';


/*
*   CourseSeletion - component
*
*   @props  onCourseSelected    Function for handling the proceed button event
* 
*   TODO: Course search
*   TODO: Courses could be displayed in grid rather than table (would fit more)
*/
class CourseSelection extends Component {
    
    constructor(props) {
        super(props);

        this.onCoursesReceived = this.onCoursesReceived.bind(this);
        this.onCourseSelected = this.onCourseSelected.bind(this);
        this.onProceed = this.onProceed.bind(this);
        
        this.state = { 
            courseSelected: false, 
            proceeding: false,
            selectedCourseIndex: null,
            selectedCourse: {} 
        };
    }

    componentDidMount() {

        Api.getCourses().then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            this.onCoursesReceived(jsonResponse);
        }).catch((reason) => {
            console.error(reason);
        });
    }

    onCoursesReceived(_courses) {
        this.setState({courses: _courses});
    }

    onCourseSelected(selection) {
        let course = this.state.courses[selection];
        this.setState({selectedCourseIndex: selection, selectedCourse: course, courseSelected: true});
    }

    onProceed() {
        // Note that this.state.selectedCourse only contains the index of the selected row
        //this.props.onCourseSelected( this.state.courses[this.state.selectedCourse] );
        
        this.setState({proceeding: true});
    }

    render() {
        
        let courses = this.state.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => {
                let selected = ( parseInt(this.state.selectedCourseIndex, 10) === index ) ? true : false;                
                return (                    
                    <TableRow key={course._id} selected={selected}>
                        <TableRowColumn>{course.name}</TableRowColumn>
                        <TableRowColumn>{course.description}</TableRowColumn>
                        <TableRowColumn>{ (course.fairways) ? course.fairways.length : 0 }</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return (

            // If not authenticated redirect to login sreen
            (!Auth.isAuthenticated()) ?
                <Redirect to="/" />
            :
                // If course selection is confirmed, proceed to player selection
                (this.state.proceeding) ?
                    <Redirect to={{ pathname: '/round/players', state:{course: this.state.selectedCourse} }}/>
                :
                    <div>
                        <h2>Choose course</h2>
                        <Table selectable={true} multiSelectable={false} onRowSelection={this.onCourseSelected}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false}>
                                <TableRow>                    
                                    <TableHeaderColumn>name</TableHeaderColumn>
                                    <TableHeaderColumn>description</TableHeaderColumn>
                                    <TableHeaderColumn>fairways</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                                {tableRows}
                            </TableBody>
                        </Table>
                        <RaisedButton primary={true} label="Proceed" onClick={this.onProceed} disabled={!this.state.courseSelected} />
                    </div>
        );
    }
}

export default CourseSelection;