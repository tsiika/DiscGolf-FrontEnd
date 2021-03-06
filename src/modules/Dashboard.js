import React, { Component } from 'react';
import {Paper} from 'material-ui';

import LastRounds from '../components/LastRounds';
import NewGame from '../components/NewGame';
import GameStats from '../components/Statistic';
import Auth from '../api/Auth';
import Api from '../api/Api';
import Redirect from 'react-router/Redirect';


class App extends Component {

    constructor(props) {
        super(props);
    
        this.onDataReceived = this.onDataReceived.bind(this);
        this.onDataFailure = this.onDataFailure.bind(this);

        this.state = { user: {} };
    }

    componentDidMount() {

        if(Auth.isAuthenticated()) {
            Api.getUser(Auth.getUserId(), this.onDataReceived, this.onDataFailure );
        }
    }

    onDataReceived(response) {
        this.setState({user: response});
    }   

    onDataFailure(errorMessage) {
        console.error(errorMessage);
    }

    render() {

        return (
            (!Auth.isAuthenticated()) ?
                <Redirect to="/"/>
            :
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <h3>{this.state.user.username}</h3>
                        </div>
                    </div>

                    <div className="row col-ctrl">
                        <div className="col-12 dash shadow"><NewGame /> </div>
                    </div>
                    <br/>
                    
                    <div className="row col-ctrl">
                        <div className="col-12 dash shadow"><GameStats /> </div>
                    </div>
                    <br/>

                    <div className="row">
                        <div className="col-12 dash shadow"><LastRounds /></div>
                    </div><br/><br/>
                </div>
        );
    }
}

export default App;
