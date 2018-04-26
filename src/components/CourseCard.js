import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import axios from 'axios';

import API from '../api/axiosAPI';

export default class CourseCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
    };
  }

  componentDidMount() {
    axios.get(API)
      .then(res => {
        const courses = res.data;
        this.setState({courses});
        console.log(this.state.courses );
      })
  };


  render() {


    return (

<div className="container">


            <h3>
              COURSE LIST
            </h3>
          <div>

              {this.state.courses.map(course => 
                <Card key={course.id} containerStyle={{width:'calc(80% - 50px)' ,margin:'auto' }} 
                expanded={this.state.expanded} 
                onExpandChange={this.handleExpandChange}
                className="cardHeader"
                >
                <CardHeader title={course.name}           
                subtitle={course.holes + " reikää"}
                  avatar="https://www.sandypines.com/wp-content/uploads/disc_golf.jpg" 
                  actAsExpander={true} 
                  showExpandableButton={true} 
                  
                /> 

                <CardMedia 
                  expandable={true} 
                  overlay={<CardTitle title={course.name} subtitle={course.description + " " + "Radassa on " + course.holes + " reikää"} />} 
                  > 
                  <img src="https://www.outsidepursuits.com/wp-content/uploads/2017/08/Best-Disc-Golf-Disc.jpg" alt="course1 Picture" /> 
                  </CardMedia> 

                </Card>
              )}

          </div>
      
      </div> 
  );
  }
}
