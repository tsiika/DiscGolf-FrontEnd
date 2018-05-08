import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';

import Api from  '../api/Api';
import Auth from '../api/Auth';

import '../App.css';
import '../styles/simple-grid.css'
import '../styles/Round.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

const style = { textAlign: 'right', padding: '0px'}

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
            loading: true,
            courseSelected: false, 
            proceeding: false,
            selectedCourseIndex: null,
            selectedCourse: {},
            height: '300px',
            stripedRows: true,
            showCheckboxes: false,
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
        this.setState({courses: _courses, loading: false});
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
        
        if(this.state.loading) return (<div className="loader"></div>);

        let courses = this.state.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => {
                let selected = ( parseInt(this.state.selectedCourseIndex, 10) === index ) ? true : false;                
                return (                    
                    <TableRow scope='row' key={course._id} selected={selected}>
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
                        <div className="container">
                        <div className="row">
                        <div className="col-12">
                        <h2>Choose course</h2>
                        <Table selectable={true} multiSelectable={false} onRowSelection={this.onCourseSelected} height={this.state.height}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={this.state.showCheckboxes}>
                                <TableRow style={style}>
                                    <TableHeaderColumn>name</TableHeaderColumn>
                                    <TableHeaderColumn>description</TableHeaderColumn>
                                    <TableHeaderColumn>fairways</TableHeaderColumn>
                                </TableRow>

                            </TableHeader>
                            <TableBody displayRowCheckbox={false} deselectOnClickaway={false} stripedRows={this.state.stripedRows} style={style}>
                                {tableRows}
                            </TableBody>
                        </Table>
                        <RaisedButton label="Proceed" onClick={this.onProceed} disabled={!this.state.courseSelected}  labelColor="#FFFFFF" backgroundColor="#00B5CC"/>
                    </div>
                    </div>
                    </div>
                </div>
        );
    }
}

export default CourseSelection;