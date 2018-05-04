import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';

import Api from  '../api/Api';
import Auth from '../api/Auth';

import '../App.css';
import '../styles/Round.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

/*
*   PlayerSelection - component
*
*   @props  onPlayersSelected   Funtion for handling the proceed button event   
*
*   TODO: Logged user should selected in to round by default
*   TODO: Player search
*   TODO: Filtering players by team and etc (in the future)
*
*/
class PlayerSelection extends Component {

    constructor(props) {
        super(props);

        this.onPlayersReceived = this.onPlayersReceived.bind(this);
        this.onProceed = this.onProceed.bind(this);
        this.onPlayerSelected = this.onPlayerSelected.bind(this);

        this.state = {
            loading: true,
            course: props.location.state.course,
            players: [], 
            selectedPlayers:[], 
            playersSelected: false,
            proceeding: false
        };
    }

    componentDidMount() {

        Api.getUsers().then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            this.onPlayersReceived(jsonResponse);
        }).catch((reason) => {
            console.error(reason);
        });
    }

    onPlayersReceived(_players) {
        this.setState({players: _players, loading: false});
    }

    onPlayerSelected(_selections) {
        // Note: _selections contains only indices of the row items, not player data-objects
        this.setState({selectedPlayers: _selections, playersSelected: (_selections.length > 0) ? true : false });
    }

    onProceed() {
        // We have to map the objects from state.players-array, because state.selectedPlayers only contains indices of the selected rows
        let selectedPlayers = this.state.selectedPlayers.map(i => this.state.players[i]);
        //this.props.onPlayersSelected(selectedPlayers);

        this.setState({selectedPlayers: selectedPlayers, proceeding: true});
    }

    render() {

        if(this.state.loading) return(<div className="loader"></div>);

        let players = this.state.players;
        let tableRows = '';

        if(players && players.length > 0) {
            
            tableRows = players.map((player, index) => {
                let selected = ( this.state.selectedPlayers.indexOf(index) !== -1 ) ? true : false;
                return (
                    <TableRow key={player._id} selected={selected}>                        
                        <TableRowColumn>{player.username}</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return (

            (!Auth.isAuthenticated()) ?
                <Redirect to="/" />
            :
                (this.state.proceeding) ?
                    <Redirect to={{ pathname: '/round/scorecard', state:{course: this.state.course, players: this.state.selectedPlayers} }}/>
                :
                    <div>
                        <h2>Choose players</h2>
                        <Table selectable={true} multiSelectable={true} onRowSelection={this.onPlayerSelected}>
                            <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={true}>
                                <TableRow>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={true} deselectOnClickaway={false}>
                                {tableRows}
                            </TableBody>
                        </Table>
                        <RaisedButton primary={true} label="Proceed" onClick={this.onProceed} disabled={!this.state.playersSelected} />
                    </div>
        );
    }
}

export default PlayerSelection;