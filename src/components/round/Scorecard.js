import React, { Component } from 'react';

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
*   Scorecard - component
*
*   Used in the Round-module.
* 
*   @props  model   Round datamodel-object
*
*   TODO: Send data-object to API
*   TODO: Keyboard-component for inputting scores on mobile.
*/
class Scorecard extends Component {
    
    constructor(props) {
        super(props);

        this.onFairwayChanged = this.onFairwayChanged.bind(this);
        this.onScoreInputChange = this.onScoreInputChange.bind(this);
        this.onProceed = this.onProceed.bind(this);

        this.state = { 
            model: this.props.model, // Model corresponding the database schema
            currentFairway: 0        // Index of the fairway in the model.course.fairways array
        };
    }
    
    // TODO: At the moment this event comes from the FairwayIndicator when the indicator dots are clicked,
    //       a keyboard for mobile usage should replace this also.
    onFairwayChanged(fairwayIndex) {
        this.setState({currentFairway: fairwayIndex});
    }

    /* Handles input change event from PlayerList and updates data-model */
    onScoreInputChange(playerId, score) {

        let _model = this.state.model;
        
        // Get the actual id of the current fairway
        let currentFairwayId = _model.course.fairways[this.state.currentFairway]._id;
        
        // Iterate fairway scores and update score according to player- and fairway-id
        _model.fairwayScores.forEach(fairwayScore => {
            if(fairwayScore.fairwayId == currentFairwayId && fairwayScore.userId == playerId ) {
                fairwayScore.score = score;
            }
        });

        this.setState({model: _model});
    }

    onProceed() {
        console.log('TODO: Save this to database: ');
        console.log(this.state.model);
    }

    render() {
        
        let currentFairwayId = 0;
        if(this.state.model.course.fairways.length > 0) {
            currentFairwayId = this.state.model.course.fairways[this.state.currentFairway]._id;
        }

        return (
            <div className="Scorecard">
                <h2>Scorecard</h2>
                {this.state.model.course.name}
                <FairwayInfo fairways={this.state.model.course.fairways} currentFairway={this.state.currentFairway} onFairwayChanged={this.onFairwayChanged} />
                <PlayerList currentFairwayId={currentFairwayId} fairwayScores={this.state.model.fairwayScores} onScoreInputChange={this.onScoreInputChange} />
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
*   @props  currentFairway      Index of the current fairway
*   @props  onFairwaySelected   Function for handling fairway selection event
*
*/
class FairwayInfo extends Component {

    constructor(props) {
        super(props);
        this.onFairwayChanged = this.onFairwayChanged.bind(this);
        this.state = {};
    }

    onFairwayChanged(event) {
        let fairwayIndex = parseInt(event.target.getAttribute('data-index'));
        this.props.onFairwayChanged(fairwayIndex);
    }

    render() {
        let fairways = this.props.fairways;
        let currentFairway = this.props.currentFairway;

        return (
            <div className="fairway-info">
                <div className="fairway-indicator">
                    { fairways.map((f, i) => {
                        let className = (i != currentFairway) ? "dot" : "dot dot-active";
                        return <div key={i} data-index={i} className={className} onClick={this.onFairwayChanged}></div>
                    })}
                </div>
                <div>
                    Fairway {currentFairway + 1} | Par X
                </div>
            </div>
        );
    }
}


/*
*   PlayerList - component
*   
*   Displays player list on the Scorecard.
*   Note that even though this called PlayerList it actually displays fairwayScore-objects.
*
*   @props  fairwayScores     Array of fairway score-data.
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
        console.log(selection);
    }

    onScoreInputChange(event) {
        // Note the usage of dataset-object
        let playerId = event.target.dataset.playerId; // Refers to 'data-player-id'-propery of the element
        let score = parseInt(event.target.value);
        this.props.onScoreInputChange(playerId, score);
    }

    render() {
        
        let currentFairwayId = this.props.currentFairwayId;
        let fairwayScores = this.props.fairwayScores;
        let tableRows = '';

        tableRows = fairwayScores.map((fairwayScore, index) => {            
            if(fairwayScore.fairwayId === currentFairwayId) {
                return (
                    <TableRow key={fairwayScore.userId}>                      
                        <TableRowColumn>{fairwayScore.userName}</TableRowColumn>
                        <TableRowColumn className="input-column"><input type="text" className="read-only" defaultValue="OB" readOnly={true} /></TableRowColumn>
                        <TableRowColumn className="input-column"><input type="text" value={fairwayScore.score || ''} data-player-id={fairwayScore.userId} onChange={this.onScoreInputChange}/></TableRowColumn>
                        <TableRowColumn className="input-column"><input type="text" className="read-only" value="0" readOnly={true}/></TableRowColumn>
                        <TableRowColumn className="input-column"><input type="text" className="read-only" value="0" readOnly={true}/></TableRowColumn>
                    </TableRow>
                );
            }
        });

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


export default Scorecard;