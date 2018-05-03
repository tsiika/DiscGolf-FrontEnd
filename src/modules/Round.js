import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';

import Api from  '../api/Api';
import Auth from '../api/Auth';

import '../App.css';
import '../Round.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';
import { WSAESTALE } from 'constants';

class Round extends Component {

    constructor(props) {
        super(props);
        
        this.getRoundData = this.getRoundData.bind(this);
        this.roundDataReceived = this.roundDataReceived.bind(this);
        this.roundDataFailure = this.roundDataFailure.bind(this);
        this.makeRows = this.makeRows.bind(this);

        this.state = { 
            roundId: props.match.params.roundId 
        };
    }

    componentDidMount() {
        this.getRoundData();
    }

    getRoundData() {
        Api.getRounds(this.state.roundId, this.roundDataReceived, this.roundDataFailure);
    }

    roundDataReceived(round) {
        this.setState({round: round});
    }

    roundDataFailure(error) {
        console.error(error);
    }

    makeRows() {

        if(!this.state.round) return '';

        let round = this.state.round;
        let scores = round.scores;
        let rows = [];
        let ind = 0;

        for(let playerId in scores) {
            let playerScores = scores[playerId];
            let columns = [];
            columns.push( <TableRowColumn key={ind}>{playerScores.userName}</TableRowColumn> );

            for(let i = 1; i <= round.course.fairways.length; i++) {
                columns.push( <TableRowColumn key={i}>{playerScores[i].throwCount}</TableRowColumn> );
            }

            rows.push( <TableRow key={playerId}>{columns}</TableRow> );
            ind++;
        }

        /* TODO : Display total throw counts etc... */

        return rows;
    }


    render() {

        let tableRows = this.makeRows();

        return (
            
            <div>
                <Table selectable={false} multiSelectable={false}>
                    <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>Player</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                    {tableRows}
                    </TableBody>
                </Table>                
            </div>
        );
    }
}

export default Round;