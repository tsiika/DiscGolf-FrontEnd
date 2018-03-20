import React, { Component } from 'react';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import { TextField, RaisedButton } from 'material-ui';

/*
    UserForm

    props {
        postData: function()    // Function for handling user data, called from form submit event handler
    }
*/
class UserForm extends Component {
    
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postDataCallback = props.postDataCallback;
        this.postData = props.postData;

        this.state = { username: '', email: '', password: '' };
    }

    handleSubmit(event) {
        
        event.preventDefault();

        let user = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };

        this.postData(user);        
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

export default UserForm;