import React, { Component } from 'react';
import Api from '../api/Api';
import Auth from '../api/Auth';

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
        
        rounds.forEach(round => {
            let r = {
                id: round._id,
                courseName: round.course.name,
                played: new Date(round.created).toLocaleDateString('en-US')
            }
            _rounds.push(r);
        });

        this.setState({rounds: _rounds});
    }

    onDataFailure(errorMessage) {
        console.log(errorMessage);
    }
    

    render() {

        let rows = this.state.rounds.map((round) =>{
            return(
                <tr key={round.id}>
                    <td>{round.courseName}</td>
                    <td>{round.played}</td>
                </tr>
            );
        });

        return (
            <div>
                <h3>Last rounds</h3>
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default LastRounds;