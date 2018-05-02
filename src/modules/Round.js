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

class Round extends Component {

    constructor(props) {
        super(props);
        
        this.getRoundData = this.getRoundData.bind(this);
        this.roundDataReceived = this.roundDataReceived.bind(this);
        this.roundDataFailure = this.roundDataFailure.bind(this);

        this.state = { roundId: props.match.params.roundId };
    }

    componentDidMount() {
        this.getRoundData();
    }

    getRoundData() {
        Api.getRounds(this.state.roundId, this.roundDataReceived, this.roundDataFailure);
    }

    roundDataReceived(round) {
        console.log(round);
    }

    roundDataFailure(error) {
        console.error(error);
    }

    render() {
        return (
            <div>
                { this.state.roundId }
            </div>
        );
    }
}

export default Round;