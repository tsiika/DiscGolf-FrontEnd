import React, { Component } from 'react';

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
                        <TableRowColumn>{course.name}</TableRowColumn>
                        <TableRowColumn>{course.description}</TableRowColumn>
                        <TableRowColumn>{course.fairways.length}</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return (
            <Table selectable={true} multiSelectable={false} onRowSelection={this.onRowSelection}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={true}>
                    <TableRow>
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableHeaderColumn>name</TableHeaderColumn>
                        <TableHeaderColumn>description</TableHeaderColumn>
                        <TableHeaderColumn>fairways</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

export default CourseTable;