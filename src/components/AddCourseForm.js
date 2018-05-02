import React, {Component} from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import '../App.css';

class AddCourseForm extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			courseName:"",
			holesNum:"",
			courseLocation:""
		}
	}
	change = (event) => {
		if (event.target.name === "courseName"){
			this.setState({
				courseName:event.target.value
			})
		}
		if (event.target.name === "holesNum"){
			this.setState({
				holesNum:event.target.value
			})
		}
		if (event.target.name === "courseLocation"){
			this.setState({
				courseLocation:event.target.value
			})
		}
	}
	submit = (event) => {
		event.preventDefault();
		let course = {
			"courseName":this.state.courseName,
			"holesNum":this.state.holesNum,
			"courseLocation":this.state.courseLocation,
		}
		this.props.updateCourse(course);
	}
	render() {
		return(
			<form onSubmit={this.submit}>
				<TextField
					name="courseName"
					hintText="Course Name"
					onChange={this.change}
					value={this.state.courseName}
					floatingLabelText="Course name"
					floatingLabelFixed
				/>
				<br/>
				<TextField
					name="holesNum"
					type="number"
					hintText="Holes Number"
					onChange={this.change}
					value={this.state.holesNum}
					floatingLabelText="Number of holes"
					floatingLabelFixed
				/>
				<br/>
				<TextField
					name="courseLocation"
					hintText="Course Location"
					onChange={this.change}
					value={this.state.courseLocation}
					floatingLabelText="Location of course"
					floatingLabelFixed
				/>
				<br/>
				<RaisedButton type="submit" label="Add Course" primary/>
			</form>
		);
	}

}
export default withRouter(AddCourseForm);