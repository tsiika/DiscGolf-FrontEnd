import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import NoMatch from '../components/404';
import Api from  '../api/Api';
import CourseTable from '../components/admin/CourseTable';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';
import CourseForm from '../components/CourseForm';
/*
import '../App.css';
import '../Courses.css';
*/
class Courses extends Component {

    constructor(props) {
        super(props);

        this.onCoursesReceived = this.onCoursesReceived.bind(this);
        this.onCoursesFailure = this.onCoursesFailure.bind(this);
        
        this.state = {courses: {}};
    }

    componentDidMount() {        
        Api.getCourses('', this.onCoursesReceived, this.onCoursesFailure);
    }

    onCoursesReceived(courses) {
        this.setState({courses: courses});
    }

    onCoursesFailure(error) {
        console.log(error);
    }

    render() {

        let match = this.props.match;

        return(
            <div>
                <Switch>                
                    <Route exact path={match.url + '/'} render={()=>{
                        return(
                            <div>
                                <h2>Courses</h2>
                                <CourseTable multiSelectable={false} courses={this.state.courses}/>
                                <Link to={{pathname: '/courses/new'}}>
                                    <RaisedButton label='Add course' primary={true}/>
                                </Link>
                            </div>
                        );
                    }}/>
                    <Route exact path={match.url + '/new'} render={({match})=>{
                        return(
                            <CourseForm courseId={null}/>
                        );
                    }}/> 
                    <Route exact path={match.url + '/:courseId'} render={({match})=>{
                        return(
                            <CourseForm courseId={match.params.courseId} />
                        );
                    }}/>
                    <Route component={NoMatch} />
                </Switch>
            </div>
        );
    }
}

export default Courses;