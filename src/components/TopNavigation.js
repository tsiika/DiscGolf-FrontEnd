import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import IconHistory from 'material-ui/svg-icons/action/history';
import IconFavorite from 'material-ui/svg-icons/action/favorite';
import IconAddCourse from 'material-ui/svg-icons/content/add-circle';
import AddCourseForm from './AddCourseForm';


const recentsIcon = <IconHistory />;
const favoritesIcon = <IconFavorite />;
const nearbyIcon = <IconLocationOn />;
const addCourseIcon = <IconAddCourse />;


/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class TopNavigation extends Component {
  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({selectedIndex: index});

  render() {
    return (
      <Paper zDepth={1}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Recent"
            icon={recentsIcon}
            onClick={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={favoritesIcon}
            onClick={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onClick={() => this.select(2)}
          />
          
          <BottomNavigationItem
            label="Add Course"
            icon={addCourseIcon}
            onClick={() => this.select(3)}
          />
        
        </BottomNavigation>
      </Paper>
    );
  }
}

export default TopNavigation;