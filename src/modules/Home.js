import React, { Component } from 'react';
import '../App.css';

import LoginForm from './Login'
import TopNavigation from '../components/TopNavigation';
import RecentTab from '../components/Recent';
import AddCourseTab from '../components/AddCourseTab'

import {Tabs, Tab} from 'material-ui/Tabs';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

class App extends Component {
  render() {
    this.state = {
    slideIndex: 0,
    }

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-12 headline">
              <h1>Disc Golf App</h1>
              <p>Amet sint aliquip elit ut non ea reprehenderit exercitation id Lorem in ad excepteur officia. Amet sint tempor fugiat mollit aute Lorem laboris laborum reprehenderit ut consectetur aliquip. Non duis esse officia ea reprehenderit esse pariatur labore duis labore magna. Nulla dolore sit veniam adipisicing nisi velit aute ullamco incididunt.</p>
            </div>
          </div>

          <div className="row"> {/* insert login-wrapper div class here */}
            <div className="col-6">
            <LoginForm/>
            </div>

            <div className="col-6">
            <h2>Start playing now!</h2>
            <p>Register for free or login!</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
            <p>Nulla velit culpa commodo nisi labore non enim aliqua dolor ullamco et velit. Incididunt consectetur irure nulla occaecat ipsum fugiat pariatur incididunt. Voluptate ipsum tempor sit tempor nulla exercitation ex. Consequat sunt et magna duis id est laboris cupidatat. Duis labore Lorem esse eu.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;