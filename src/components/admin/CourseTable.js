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

export default CourseTable;