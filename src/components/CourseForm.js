import React, { Component } from 'react';
import Api from '../api/Api';

import { TextField, RaisedButton, Card, CardText } from 'material-ui';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

import {blue500, red500, greenA200} from 'material-ui/styles/colors';

/*
*   CourseForm  
*
*   @props  courseId    String  Course object id.
*
*   Displays Course information as a form.
*   If courseId is provided, used to editing existing Course,
*   otherwise, to create a new one.
*/
class CourseForm extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {course: {}};
    }
    
    componentDidMount() {

        // TODO: Find out why Api.getCourses is called twice when RELOADING the /courses/'courseId'
        if(this.props.courseId) {
            
            Api.getCourses(this.props.courseId).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({course: jsonResponse});
            }).catch((reason) => {
                console.error(reason);
            });
        }
    }

    onInputChange(event) {

        // TODO: WARNING!: This does not make a copy of the this.state.course, but only a new reference to it,
        // so setting property of the course actually mutates this.state.course.
        // Correct way to do this, would using Object.assign() (or similar) to actually make a copy of it.
        // BUT with nested objects this is more trickier...
        // SEE: 'React Immutability Helpers' and etc...
        let course = this.state.course;
        // Note: Using 'computed property' (ES2015) names for setting the state object
        course[event.target.name] = event.target.value;
        this.setState({course: course});
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.course);
    }

    render() {

        let title = this.state.course.name || 'New course';

        return(
            <div className="flex-container">
                <div className="course-form-wrapper">
                    <h2>{title}</h2>
                    <form onSubmit={this.onSubmit}>
                        <div>
                            <TextField className="course-form-text-field" type="text" name="name" floatingLabelText="Name" floatingLabelFixed={true} value={this.state.course.name || ''} onChange={this.onInputChange}  />
                        </div>
                        <div>
                            <TextField className="course-form-text-field" type="text" name="description" multiLine={true} floatingLabelText="Description" floatingLabelFixed={true} value={this.state.course.description || ''} onChange={this.onInputChange}  />
                        </div>
                        <div>
                            <h3>Fairways</h3>
                            <FairwayTable fairways={this.state.course.fairways}s/>
                        </div>
                        <div>
                            <RaisedButton type="submit" label="Save" primary={true} />
                        </div> 
                    </form>
                    
                </div>
            </div>
        );
    }
}

/*
*   FairwayTable
*
*   @props  fairways        Array       Fairway data-objects.
*   @props  onFairwayEdit   Function    Listener function for handling fairway edit events.
*
*   Displays course's fairways and enables creating new ones.
*/
class FairwayTable extends Component {
    
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = { dataEdited: false };
    }

    /*
        <FloatingActionButton backgroundColor={'#FF3A3A'} >
            <ContentRemove />
        </FloatingActionButton>
    */

    onRowSelection() {

    }

    onInputChange(event) {

        
        //console.log(event.target.dataset.order);
        let order = parseInt(event.target.dataset.order);
        // Pick the correct fairway-object and change property
        let fairway = this.props.fairways.find((element) => { return element.order == order });
        fairway[ event.target.name ] = parseInt(event.target.value);
        //console.log(fairway);
        
        // Note the usage dataset-object
        // event.target.dataset.playerId; // Refers to 'data-player-id'-propery of the element
        
        this.props.fairways.push({order: 4, length: 48, par: 1});
        
    }

    render() {
        console.log('---FairwayTable.render');

        let fairways = this.props.fairways || [];

        return (
            <Table selectable={true} multiSelectable={true} onRowSelection={this.onRowSelection}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={true}>
                <TableRow>
                <TableHeaderColumn>Order</TableHeaderColumn>
                <TableHeaderColumn>Length</TableHeaderColumn>
                <TableHeaderColumn>Par</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} deselectOnClickaway={true}>
                    {fairways.map((fairway) => {
                        return(
                            <TableRow key={fairway.order}>
                                <TableRowColumn>
                                    {fairway.order}
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField className="" type="text" name="length" data-order={fairway.order} defaultValue={fairway.length || ''} onBlur={this.onInputChange}  />
                                </TableRowColumn>
                                <TableRowColumn>
                                    <TextField className="" type="text" name="par" data-order={fairway.order} defaultValue={fairway.par || ''} onBlur={this.onInputChange}  />
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }
}

export default CourseForm;