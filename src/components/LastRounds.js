import React, { Component } from 'react';
import Api from '../api/Api';
import Auth from '../api/Auth';
import { Link } from 'react-router-dom';

import Warn from './no-use';

/*
*   LastRounds - Displays player's latest rounds on Dashboard
*/
class LastRounds extends Component {

    constructor(props) {
        super(props);

        this.onRoundsReceived = this.onRoundsReceived.bind(this);
        this.onDataFailure = this.onDataFailure.bind(this);

        this.state = { rounds: [] };
    }
    
    componentDidMount() {
        if(Auth.isAuthenticated()) {
            Api.getUserRounds(Auth.getUserId(), this.onRoundsReceived, this.onDataFailure);
        }
    }
    
    onRoundsReceived(rounds) {

        let _rounds = [];
        let userId = Auth.getUserId();

        rounds.forEach(round => {
            let r = {
                id: round._id,
                courseName: (round.course) ? round.course.name : 'Unknown course',
                played: new Date(round.created).toLocaleDateString('en-US'),
                diffToPlayedPar: round.scores[userId].diffToPlayedFairwaysPar
            }

            _rounds.push(r);
        });

        this.setState({rounds: _rounds});
    }

    onDataFailure(errorMessage) {
        console.error(errorMessage);
    }
    
    render() {

        let rows = this.state.rounds.map((round) => { 
            return(
                <tr key={round.id}>
                    <td style={{textAlign: 'left'}}><Link to={{pathname: '/round/' + round.id}}>{round.played}</Link></td>
                    <td style={{textAlign: 'left'}}>{round.courseName}</td>
                    <td style={{textAlign: 'right'}}>{(round.diffToPlayedPar > 0) ? '+' + round.diffToPlayedPar : round.diffToPlayedPar}</td>
                </tr>
            );
        });

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1>Last rounds</h1>
                            <h3>Latest rounds played by you!</h3>

                            <Warn/>

                            <table className="last">
                                <tbody>
                                    {(rows.length > 0) ? rows : <tr><td>No played rounds</td></tr>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LastRounds;