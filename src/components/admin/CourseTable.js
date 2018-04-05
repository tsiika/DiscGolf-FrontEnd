import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

class CourseTable extends Component {
    
    constructor(props) {
        super(props);
        
        this.onRowSelection = props.onCoursesSelected;

        // Default multiselection to true
        this.multiSelectable = (props.hasOwnProperty('multiSelectable')) ? props.multiSelectable : true;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.courses.length === this.props.courses.length) return false;
        return true;
    }

    render() {
        let courses = this.props.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => {
                
                return (
                    
                    <TableRow key={index}>
                        <TableRowColumn>{course._id}</TableRowColumn>
                        <TableRowColumn><Link to={{ pathname:'/courses/' + course._id}} >{course.name}</Link></TableRowColumn>
                        <TableRowColumn>{course.description}</TableRowColumn>
                        <TableRowColumn>{ (course.fairways) ? course.fairways.length : 0 }</TableRowColumn>
                    </TableRow>
                    
                );
            });
        }

        return (
            <Table selectable={true} multiSelectable={this.multiSelectable} onRowSelection={this.onRowSelection}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={this.multiSelectable}>
                    <TableRow>
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableHeaderColumn>name</TableHeaderColumn>
                        <TableHeaderColumn>description</TableHeaderColumn>
                        <TableHeaderColumn>fairways</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={this.multiSelectable} deselectOnClickaway={!this.multiSelectable}>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

export default CourseTable;