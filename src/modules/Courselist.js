import React, { Component } from 'react';

import TopNavigation from '../components/TopNavigation';
import CourseCard from '../components/CourseCard';
import AddCourseForm from '../components/AddCourseForm';


import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import FontIcon from 'material-ui/FontIcon';
import IconAddCourse from 'material-ui/svg-icons/content/add-circle';
import TrackIcon from 'material-ui/svg-icons/action/track-changes';

const styles = {
headline: {
fontSize: 24,
paddingTop: 16,
marginBottom: 12,
fontWeight: 400,
},
slide: {
padding: 10,
},
}; 

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
        value={this.state.slideIndex}
    >
        <Tab icon={<TrackIcon />}
            label="Recent" value={0} />
{ /*       <Tab icon={<IconFavorite />}
            label="FAVORITES" value={1} />
        <Tab icon={<MapsPersonPin />}
label="NEARBY" value={2} /> */}
        <Tab icon={<IconAddCourse />}
            label="Add course" value={1} />


    </Tabs>
    <SwipeableViews
        index={this.state.slideIndex}
        onChangeIndex={this.handleChange}
    >
        <div>
        <CourseCard />
        </div>

        <div>
        <AddCourseForm />
        </div>
    </SwipeableViews>
    </div>
);
}
}

export default App;
