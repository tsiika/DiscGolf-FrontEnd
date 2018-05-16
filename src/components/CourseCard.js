import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';

// Images
import DG1 from './img/Disc-Golf-course1.jpg';
import DGavatar from './img/disc_golf.jpg';

//import API from '../api/axiosAPI';
import Api from '../api/Api';

export default class CourseCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    /*
    axios.get(API)
      .then(res => {
        const courses = res.data;
        this.setState({courses});
        console.log(this.state.courses );
      })
      */
    Api.getCourses(null, (result) => {
        this.setState({courses: result})
    }, (error) => {
        console.error(error);
    });
  };


  render() {


    return (

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h3 style={{paddingTop: '22px'}}>
              Courses
            </h3>

            <div>
              {this.state.courses.map(course => 
                <Card 
                key={course.id} 
                containerStyle={{ margin:'auto' }} 
                expanded={this.state.expanded} 
                onExpandChange={this.handleExpandChange}
                className="cardHeader" >

                <CardHeader 
                title={course.name}    
                subtitle={course.fairways.length  + " holes"}
                avatar={DGavatar}
                actAsExpander={true} 
                showExpandableButton={true} /> 

                <CardMedia 
                  expandable={true} 
                  overlay={
                    <CardTitle 
                      title={course.name} 
                      subtitle={course.description + " " + "Course has " + course.fairways.length + " holes"} />
                      } > 
                  <img src={DG1} alt="Course picture" /> 
                </CardMedia> 
                </Card>
              )}
            </div>
          </div>
        </div>
      </div> 
  );
  }
}
