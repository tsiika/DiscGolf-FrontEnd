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
    CourseForm

    props {
        postData: function()    // Function for handling user data, called from form submit event handler
    }
*/
class CourseForm extends Component {
    
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.postData = props.postData;

        this.state = { name: '', description: '' };
    }

    handleSubmit(event) {
        
        event.preventDefault();

        let course = {
            name: this.state.name,
            description: this.state.description
        };

        this.postData(course);
    }

    handleInputChange(event) { 
        // Note: Using 'computed property' (ES2015) names for setting the state object
        this.setState({[event.target.name]: event.target.value});
    }

    render() {

        return(
            <form onSubmit={this.handleSubmit}>
                <div>
                    <TextField hintText="Name" id="name" name="name" type="text" value={this.state.name} onChange={this.handleInputChange} />
                </div>
                <div>
                    <TextField hintText="Description" id="description" name="description" type="text" value={this.state.description} onChange={this.handleInputChange} />
                </div>
                <div>
                    <RaisedButton type="submit" label="Add" />
                </div>
            </form>
        );
    }
}

export default CourseForm;