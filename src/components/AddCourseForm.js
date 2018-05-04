import React, { Component } from 'react';
import Api from '../api/Api';

import { TextField, RaisedButton } from 'material-ui';
import { Redirect, withRouter } from 'react-router-dom';

import '../App.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';

/*
*   CourseForm  
*
*   @props  courseId    String  Course object id.
*
*   Displays Course information as a form.
*   If courseId is provided, used to editing existing Course,
*   otherwise, to create a new one.
*
*   TODO:
*   - VALIDATION!
*   - Indication for succesful and failed save events
*   - Fairway deletion
*/
class CourseForm extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSaveCourse = this.onSaveCourse.bind(this);
        this.onAddFairway = this.onAddFairway.bind(this);
        this.onCourseSaved = this.onCourseSaved.bind(this);

        this.state = {course: {}};
    }
    
    componentDidMount() {

        // TODO: Find out why Api.getCourses is called twice when RELOADING the /courses/'courseId'

        // If editing existing course, get it's data
        if(this.props.courseId) {
            
            Api.getCourses(this.props.courseId).then((response) => {
                return response.json();
            }).then((jsonResponse) => {
                console.log(jsonResponse);
                this.setState({course: jsonResponse});
            }).catch((reason) => {
                console.error(reason);
            });
        } else {

            // Create new empty course
            let course = {name: null, description: null, fairways: []};            
            this.setState({course: course});
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

    onSaveCourse(event) {
        event.preventDefault();
        
        // If updating existing course
        if(this.state.course._id) {
            Api.putCourse(this.state.course, this.onCourseSaved, this.onCourseSaveFailure);
        } else {
            Api.postCourse(this.state.course, this.onCourseSaved, this.onCourseSaveFailure);
        }
    }

    onCourseSaved(result) {
        this.setState({course: result});
    }

    onCourseSaveFailure(reason) {
        console.error(reason);
    }

    onAddFairway(event) {

        // Create copy of course-object from the state-object.
        // Note that, at this point, new course is it's own copy, but course.fairways is still just a reference to the old state.course.fairways,
        // because Object.assign only creates a shallow copy.
        let course = Object.assign({}, this.state.course);

        // Create new empty fairway-object
        // Note that this excepts that existing fairways have correct orders corresponding to the amount of them  
        let newFairway = {order: course.fairways.length + 1, length: null, par: null};

        // Create new fairways-array by concatenating into existing array reference.
        // Note that concat-method actually returns a new array.
        let fairways = course.fairways.concat(newFairway);
        
        // Assign new fairways to the course
        course.fairways = fairways;

        this.setState({course: course});
    }

    render() {

        let title = this.state.course.name || 'New course';

        return(
            <div className="flex-container">
                <div className="course-form-wrapper">
                    <h2>{title}</h2>
                    
                <form onSubmit={this.onSaveCourse}>
				<TextField
					name="name"
					type="text"
					hintText="Course Name"
                    value={this.state.course.name || ''} 
                    onChange={this.onInputChange}
					floatingLabelText="Course name"
					floatingLabelFixed={true}
				/>
				<br/>

				<TextField
					name="description"
					hintText="Description"
                    value={this.state.course.description || ''} 
                    onChange={this.onInputChange}
					floatingLabelText="Description"
					floatingLabelFixed={true}
				/>
				<br/>

				<TextField
					name="holes"
					hintText="Holes"
                    value={this.state.course.holes || ''} 
                    onChange={this.onInputChange}
					floatingLabelText="Holes"
					floatingLabelFixed={true}
				/>
				<br/>

                <div>
                    <h3>Fairways</h3>
                    <FairwayTable fairways={this.state.course.fairways}s/>
                </div>
                    <RaisedButton style={{margin: '10px'}} type="button" label="Add fairway" primary={true} backgroundColor="#BB9" onClick={this.onAddFairway} />
					<RaisedButton style={{margin: '10px'}} type="submit" label="Save" primary={true} />
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
*
*   Displays course's fairways and enables editing their properties.
*/
class FairwayTable extends Component {
    
    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.state = {};
    }

    onRowSelection() {
        return false;
    }

    onInputChange(event) {

        // Note the usage of the dataset-property
        let order = parseInt(event.target.dataset.order, 10); // Refers to 'data-player-id' of the element
        
        // Pick the correct fairway-object and change property
        let fairway = this.props.fairways.find((element) => { return element.order === order });
        
        // TODO / WARNING: This is not the proper way to do this! This mutates state-object(received by props), because this.props.fairways
        // is reference to it. This should be done by, for example, using Object.assing (see CourseForm.onAddFairway) or by
        // with React's immutability helper addonsn, and then setting the state with new data. 
        fairway[ event.target.name ] = parseInt(event.target.value, 10);
    }

    render() {

        let fairways = this.props.fairways || [];

        return (

			<div className="container">
			<div className="row">
			<div className="col-12">
            <Table selectable={true} multiSelectable={false} onRowSelection={this.onRowSelection}>
                <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                <TableHeaderColumn>Order</TableHeaderColumn>
                <TableHeaderColumn>Length</TableHeaderColumn>
                <TableHeaderColumn>Par</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false} deselectOnClickaway={true}>
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
			</div>
			</div>
			</div>
        );
    }
}

export default CourseForm;