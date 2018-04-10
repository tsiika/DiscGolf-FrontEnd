import React, { Component } from 'react';
import '../App.css';
import TopNavigation from '../components/TopNavigation';
import CourseCard from '../components/CourseCard';
import AddCourseForm from '../components/AddCourseForm';



class App extends Component {
  render() {

    return (
      <div>
        <h2>This is home page.</h2>
        <TopNavigation/>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <AddCourseForm />
      </div>
    );
  }
}

export default App;
