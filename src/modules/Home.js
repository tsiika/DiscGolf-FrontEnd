import React, { Component } from 'react';
import '../App.css';
import RecentTab from '../components/Recent';
import FavoritsTab from '../components/Favorits';
import NearbyTab from '../components/Nearby';
import AddCourseTab from '../components/AddCourseTab'
import BNavigationBar from '../components/BottomNavigation'
import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

import FontIcon from 'material-ui/FontIcon';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import IconHistory from 'material-ui/svg-icons/action/history';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconAddCourse from 'material-ui/svg-icons/content/add-circle';

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
          <Tab icon={<IconHistory />}
               label="Recent" value={0} />
          <Tab icon={<IconFavorite />}
               label="FAVORITES" value={1} />
          <Tab icon={<MapsPersonPin />}
               label="NEARBY" value={2} />
          <Tab icon={<IconAddCourse />}
               label="Add course" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <RecentTab />
          </div>
          <div>
            <FavoritsTab />
          </div>
          <div >
            <NearbyTab />
          </div>
          <div>
            <AddCourseTab />
          </div>
        </SwipeableViews>
        
      </div>
    );
  }
}

export default App;