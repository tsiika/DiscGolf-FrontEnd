import React, { Component } from 'react';
import Api from '../api/Api';

import { TextField, RaisedButton, Card, CardText } from 'material-ui';

class CourseForm extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleInputChange(event) {

        let course = this.state.course;
        // Note: Using 'computed property' (ES2015) names for setting the state object
        course[event.target.name] = event.target.value;
        this.setState({course: course});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.course);
    }

    render() {

        let title = this.state.course.name || 'New course';

        return(
            <div className="flex-container">
                <div className="course-form-wrapper">
                    <h2>{title}</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField className="course-form-text-field" type="text" name="name" floatingLabelText="Name" floatingLabelFixed={true} value={this.state.course.name || ''} onChange={this.handleInputChange}  />
                        </div>
                        <div>
                            <TextField className="course-form-text-field" type="text" name="description" multiLine={true} floatingLabelText="Description" floatingLabelFixed={true} value={this.state.course.description || ''} onChange={this.handleInputChange}  />
                        </div>
                        <div>
                            <h3>TODO: Render fairway list</h3>
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

export default CourseForm;