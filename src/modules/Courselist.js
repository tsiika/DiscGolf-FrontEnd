import React, { Component } from 'react';

//import TopNavigation from '../components/TopNavigation';
import CourseCard from '../components/CourseCard';
import AddCourseForm from '../components/AddCourseForm';
import CourseSelection from '../components/CourseSelection'



import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import IconAddCourse from 'material-ui/svg-icons/content/add-circle';
import ListIcon from 'material-ui/svg-icons/action/list';
import CardIcon from 'material-ui/svg-icons/maps/layers';


class App extends Component {
    constructor(props) {
    super(props);
        this.state = {
            slideIndex: 0,
    };
}

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
    });
};

render() {

return (
    <div>
    <Tabs
        onChange={this.handleChange}
        value={this.state.slideIndex}>

        <Tab icon={<CardIcon />}
            label="Courses" value={0} />

        <Tab icon={<ListIcon />}
            label="Courselist" value={1} />

        <Tab icon={<IconAddCourse />}
            label="Add course" value={2} />


    </Tabs>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}>

                    <div>
                    <CourseCard />
                    </div>

                    <div>
                    <CourseSelection />
                    </div>

                    <div>
                    <AddCourseForm />
                    </div>

                </SwipeableViews>
            </div>
        </div>
    </div>
    </div>
    );
    }
}

export default App;
