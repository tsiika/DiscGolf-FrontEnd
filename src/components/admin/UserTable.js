import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

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

export default UserTable;