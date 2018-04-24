import React, { Component } from 'react';

import PrevMatch from '../components/PrevMatch';
import PrevTourn from '../components/PrevTourn';
import NewGame from '../components/NewGame';
import GameStats from '../components/Statistic';
import Auth from '../api/Auth';
import Api from '../api/Api';
import Redirect from 'react-router/Redirect';

 
class App extends Component {

    constructor(props) {
        super(props);
    
        this.getData = this.getData.bind(this);
        this.onDataReceived = this.onDataReceived.bind(this);
        this.onDataFailure = this.onDataFailure.bind(this);

        this.state = {user: {}};
    }

    componentDidMount() {
        if(Auth.isAuthenticated()) {
            Api.getUsers(Auth.getUserId(), this.onDataReceived, this.onDataFailure );
        }
    }


    getData() {
        //Api.getUsers()
    }

    onDataReceived(response) {
        console.log('Users received:');
        this.setState({user: response});

    }   

    onDataFailure(errorMessage) {
        console.log('FAILURE: ' + errorMessage);
    }

    render() {
        console.log('Dashboard.render');
        return (
            (!Auth.isAuthenticated()) ?
                <Redirect to="/"/>
            :
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                        <h3>User id: {Auth.getUserId()}</h3>
                        <h3>User name: {this.state.user.name}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6"><NewGame /> </div>
                        <div className="col-6"><GameStats /> </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-6"> <PrevMatch /> </div>
                        <div className="col-6"> <PrevTourn /> </div>
                    </div>
                </div>
        );
    }
}

export default App;
