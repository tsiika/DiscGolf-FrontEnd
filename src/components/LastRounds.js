import React, { Component } from 'react';
import Api from '../api/Api';
import Auth from '../api/Auth';

class LastRounds extends Component {

    constructor(props) {
        super(props);

        this.onRoundsReceived = this.onRoundsReceived.bind(this);
        this.onDataFailure = this.onDataFailure.bind(this);

        this.state = { rounds: {} };
    }
    
    componentDidMount() {
        if(Auth.isAuthenticated()) {
            Api.getUserRounds(Auth.getUserId(), this.onRoundsReceived, this.onDataFailure);
        }
    }
    
    onRoundsReceived(rounds) {
        console.log('onRoundsReceived');
        
        let courseIds = [];

        rounds.forEach(round => {
            console.log(round.courseId);
            
            if(!courseIds.includes(round.courseId)) {
                Api.getCourses(round.courseId, (course) => {
                    console.log(course);
                }, (error) => {
                    console.log(error);
                });
            }
            
            courseIds.push(round.courseId);
        });
    }

    onDataFailure(errorMessage) {
        console.log(errorMessage);
    }
    

    render() {
        return (
            <div>
                <h3>Last rounds</h3>
            </div>
        );
    }
}

export default LastRounds;