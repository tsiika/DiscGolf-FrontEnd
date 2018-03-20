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
        this.onRowSelection = props.onUsersSelected;
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.users.length === this.props.users.length) return false;
        return true;
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

        return (
            <Table selectable={true} multiSelectable={true} onRowSelection={this.onRowSelection}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={true}>
                    <TableRow>
                        <TableHeaderColumn>id</TableHeaderColumn>
                        <TableHeaderColumn>username</TableHeaderColumn>
                        <TableHeaderColumn>email</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                    {tableRows}
                </TableBody>
            </Table>
        );
    }
}

export default UserTable;