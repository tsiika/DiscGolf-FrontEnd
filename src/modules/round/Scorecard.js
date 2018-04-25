import React, { Component } from 'react';
import Api from '../../api/Api';

import {
    Table,
    TableBody,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';


import '../../App.css';
import '../../Round.css';

// Polyfill for the ES2015 Number.isInteger (For IE)
// TODO: Move this some util module, or etc.
Number.isInteger = Number.isInteger || function(value) {
    return typeof value === "number" && 
           isFinite(value) && 
           Math.floor(value) === value;
};

/*
*   Scorecard - component
*
*   @props  course      Course data object
*   @props  players     Array of Player data objects
*
*   TODO: Keyboard-component for inputting scores on mobile.
*
*   TODO:
*   Lopuksi yhteenvedossa tallennetaan heitetyiksi vain ne väyläsuoritukset, joiden heittomäärä on yli 0.
*/
class Scorecard extends Component {
    
    constructor(props) {

        super(props);

        this.onFairwayChanged = this.onFairwayChanged.bind(this);
        this.onScoreInputChange = this.onScoreInputChange.bind(this);
        this.onProceed = this.onProceed.bind(this);
        this.onRoundSaved = this.onRoundSaved.bind(this);
        this.onRoundSaveFailure = this.onRoundSaveFailure.bind(this);

        // Init Round data object
        let round = { _id: null, course: props.course, players: [], scores: {} };

        props.players.forEach((player) => {

            // Populate round.players with just player ids
            round.players.push(player._id);

            // Init scores-array with objects with player ids as keys
            round.scores[player._id] = {};
            // For each player, store each fairway throw count and ob as it's own object,
            // and par value for convenience
            round.course.fairways.forEach((fairway) => {
                round.scores[player._id][fairway.order] = {
                    throwCount: null,
                    ob: false,
                    par: fairway.par
                };
            })
            // Also store the inital total throw count
            round.scores[player._id].totalThrowCount = 0;
            // .. total difference to played fairways total par
            round.scores[player._id].diffToPlayedFairwaysPar = null;
            // ...and the player(user) name for convenience
            round.scores[player._id].userName = player.username;
        });

        let currentFairway = null;
        // TODO: course total par should propably be stored in database
        let courseTotalPar = 0;
        // Pick the first fairway of the course (Initially it should be the fairway with order=1)
        round.course.fairways.forEach((fairway) => {
            courseTotalPar += fairway.par;
            if( parseInt(fairway.order, 10) === 1 ) currentFairway = fairway;
        });

        // If fairway with order=1 was not found (though it should be), pick the first from fairway-array
        if(!currentFairway) currentFairway = round.course.fairways[0];
        
        this.state = { 
            round: round,
            currentFairway: currentFairway,     // Fairway data
            courseTotalPar: courseTotalPar      // Total par value of the course
        };
    }
    
    // TODO: At the moment this event comes from the FairwayIndicator when the indicator dots are clicked,
    //       a keyboard for mobile usage should replace that also.
    onFairwayChanged(fairwayOrder) {
        
        this.state.round.course.fairways.forEach((fairway) => {
            if( parseInt(fairway.order, 10) === fairwayOrder ) {
                this.setState({currentFairway: fairway});
            }
        });
    }

    // Handles input change event from PlayerList and updates data-model
    onScoreInputChange(playerId, newThrowCount) {

        // Note the object copy by assign
        let _round = Object.assign({}, this.state.round);

        // Update fairway throw count
        _round.scores[playerId][this.state.currentFairway.order].throwCount = newThrowCount;
        
        // Update total round throw count and total difference to player's played fairways total par value
        let _totalThrowCount = 0;
        let _diffToPlayedFairwaysPar = 0;

        for(let fairwayOrder in _round.scores[playerId]) {

            let fairway = _round.scores[playerId][fairwayOrder];
            
            if(fairway && fairway.throwCount) {
                _totalThrowCount += fairway.throwCount;
                _diffToPlayedFairwaysPar += fairway.throwCount - fairway.par; 
            }
        }

        _round.scores[playerId].totalThrowCount = _totalThrowCount;
        _round.scores[playerId].diffToPlayedFairwaysPar = _diffToPlayedFairwaysPar;

        // Mark fairway as 'played' (This is mainly for displaying played ones on the FairwayInfo).
        // Also note that fairway objects do not contain 'played'-property, it's created here 'on the fly'.
        _round.course.fairways.forEach((fairway) => {
            if(fairway.order === this.state.currentFairway.order) fairway.played = true;
        });

        this.setState({round: _round});
    }

    onProceed() {
        //this.props.postOrUpdateRound();

        if(this.state.round._id !== null) {
            Api.putRound(this.state.round, this.onRoundSaved, this.onRoundSaveFailure);
        } else {
            Api.postRound(this.state.round, this.onRoundSaved, this.onRoundSaveFailure);
        }
        
    }

    onRoundSaved(response) {

        if(response && response._id) {
            // Update the round id, if this was creation event
            if(this.state.round._id === null) {
                let round = Object.assign({}, this.state.round);
                round._id = response._id;
                this.setState({round: round});
            }
        } else {
            console.error('Error on saving round data');
        }
    }
    
    onRoundSaveFailure(error) {
        console.error(error);
    }


    render() {

        let round = this.state.round;

        return (
            <div className="Scorecard">
                <h2>Scorecard</h2>
                {round.course.name} - Par {this.state.courseTotalPar}
                <FairwayInfo fairways={round.course.fairways} currentFairway={this.state.currentFairway} onFairwayChanged={this.onFairwayChanged} />
                <PlayerList currentFairway={this.state.currentFairway} scores={round.scores} courseTotalPar={this.state.courseTotalPar} onScoreInputChange={this.onScoreInputChange} />
                <RaisedButton primary={true} label="Proceed" onClick={this.onProceed} />
            </div>
        );
    }
}

/*
*   FairwayInfo - component
*   
*   Displays current fairway on the Scorecard
*
*   @props  fairways            Array of fairway-data
*   @props  currentFairway      Current fairway-object
*   @props  onFairwaySelected   Function for handling fairway selection event
*
*   TODO: There's actually no need to pass fairway-array as props for this component,
*         only fairway count and current fairway would do be enough to display indicator dots...
*/
class FairwayInfo extends Component {

    constructor(props) {
        super(props);
        this.onFairwayChanged = this.onFairwayChanged.bind(this);
        this.state = {};
    }

    onFairwayChanged(event) {
        let fairwayOrder = parseInt(event.target.getAttribute('data-order'), 10);
        this.props.onFairwayChanged(fairwayOrder);
    }

    render() {
        let fairways = this.props.fairways;
        let currentFairway = this.props.currentFairway;

        return (
            <div className="fairway-info">
                <div className="fairway-indicator">
                    { fairways.map((f, i) => {
                        // Display current and played fairways with different fill colors
                        let className = "dot";
                        if(f.order === currentFairway.order) {
                            className += " dot-active";
                        } else if(f.played) {
                            className += " dot-played";
                        }

                        return <div key={f.order} data-order={f.order} className={className} onClick={this.onFairwayChanged}></div>
                    })}
                </div>
                <div>
                    Fairway {currentFairway.order} | Par {currentFairway.par}
                </div>
            </div>
        );
    }
}


/*
*   PlayerList - component
*   
*   Displays player list on the Scorecard:
*   - Player name
*   - Out-of-Bounds marker
*   - Input field for current fairway throw count.
*   - Total throw count on the round
*   - Total throw count difference to total fairway par value played by the player   
*
*   @props  currentFairway      Object      Current fairway-object.
*   @props  scores              Object      Round score data.
*   @props  courseTotalPar      Number      Total par value of the course
*   @props  onScoreInputChange  Function    Callback function to handle input change.
*
*/
class PlayerList extends Component {

    constructor(props) {

        super(props);

        this.onPlayerSelected = this.onPlayerSelected.bind(this);
        this.onScoreInputChange = this.onScoreInputChange.bind(this);
        
        this.state = {};
    }

    onPlayerSelected(selection) {
        //console.log(selection);
    }

    onScoreInputChange(event) {
        // Note the usage of dataset-object
        let playerId = event.target.dataset.playerId; // Refers to 'data-player-id'-propery of the element
        let throwCount = parseInt(event.target.value, 10);

        // If inputted value is not integer, store null
        if(!Number.isInteger(throwCount)) throwCount = null;

        this.props.onScoreInputChange(playerId, throwCount);
    }

    render() {
        
        let currentFairway = this.props.currentFairway;
        let scores = this.props.scores;
        //let courseTotalPar = this.props.courseTotalPar;

        // Create table rows from round score data
        let tableRows = [];
        for(let playerId in scores) {
            
            let playerName = scores[playerId].userName;
            let throwCount = scores[playerId][currentFairway.order].throwCount || 0;
            let ob = scores[playerId][currentFairway.order].ob;
            let totalThrowCount = scores[playerId].totalThrowCount;
            //let diffToFairwayPar = throwCount - currentFairway.par;
            //let differenceToCourseTotalPar = totalThrowCount - courseTotalPar;
            let diffToPlayedFairwaysTotalPar = scores[playerId].diffToPlayedFairwaysPar;

            // Add plus signs for positive difference values
            //diffToFairwayPar = (diffToFairwayPar > 0) ? '+' + diffToFairwayPar : diffToFairwayPar;
            //differenceToCourseTotalPar = (differenceToCourseTotalPar > 0) ? '+' + differenceToCourseTotalPar : differenceToCourseTotalPar;
            diffToPlayedFairwaysTotalPar = (diffToPlayedFairwaysTotalPar > 0) ? '+' + diffToPlayedFairwaysTotalPar : diffToPlayedFairwaysTotalPar;
 
            tableRows.push(
                <TableRow key={playerId}>                      
                    <TableRowColumn>{playerName}</TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" defaultValue={ob} readOnly={true} /></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" value={throwCount} data-player-id={playerId} onChange={this.onScoreInputChange}/></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" value={totalThrowCount || 0} readOnly={true}/></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" value={diffToPlayedFairwaysTotalPar || 0} readOnly={true}/></TableRowColumn>
                </TableRow>
            );
        }
        

        return (
            <div className="player-list">
                <Table selectable={true} multiSelectable={false} onRowSelection={this.onPlayerSelected}>
                    <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                        {tableRows}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

class Keyboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        
        return (
            <div className="Keyboard">
                <div className="column">
                    <div className="row">
                        <RaisedButton primary={true} className="button" label="1" />
                        <RaisedButton primary={true} className="button" label="1" />
                        <RaisedButton primary={true} className="button" label="1" />
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Scorecard;