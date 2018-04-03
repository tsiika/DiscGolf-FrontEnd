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
*   
*   TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO TODO 
*   Fairways don't have object_ids anymore cause they are embedded into course,
*   so change the ROUND-datamodel so that it has FAIRWAYS-array (And make this array straight from the course.fairways-array) 
*   instead of fairwayScores-array. And build players and scores under that array (like they are now under fairwayScores).
*   TODO TODO TODOTODO TODO TODOTODO TODO TODOTODO TODO TODOTODO TODO TODOTODO TODO TODO TODO
*
*/
class Scorecard extends Component {
    
    constructor(props) {
        super(props);

        this.onFairwayChanged = this.onFairwayChanged.bind(this);
        this.onScoreInputChange = this.onScoreInputChange.bind(this);
        this.onProceed = this.onProceed.bind(this);

        let currentFairway = null;
        let courseTotalPar = 0;
        // Pick the first fairway of the course (Initially it should be the fairway with order=1)
        this.props.model.course.fairways.forEach((fairway) => {
            courseTotalPar += fairway.par;
            if( parseInt(fairway.order) === 1 ) currentFairway = fairway;
        });

        // If fairway with order=1 was not found (though it should be), pick the first from fairway-array
        if(!currentFairway) currentFairway = this.props.model.course.fairways[0];
        
        this.state = { 
            model: this.props.model,            // Model corresponding the database schema
            currentFairway: currentFairway,     // Fairway data
            courseTotalPar: courseTotalPar      // Total par value of the course
            //currentFairwayOrder: 1              // Current fairway order number
        };
    }
    
    // TODO: At the moment this event comes from the FairwayIndicator when the indicator dots are clicked,
    //       a keyboard for mobile usage should replace that also.
    onFairwayChanged(fairwayOrder) {
        
        this.props.model.course.fairways.forEach((fairway) => {
            if( parseInt(fairway.order) === fairwayOrder ) {
                this.setState({currentFairway: fairway});
            }
        });
    }

    /* Handles input change event from PlayerList and updates data-model */
    // TODO: Change the name of this function
    onScoreInputChange(playerId, throws) {

        let _model = this.state.model;

        /*
        // Iterate fairway scores and update score according to player- and fairway order number
        _model.fairwayScores.forEach(fairwayScore => {
            if(fairwayScore.fairwayOrder == this.state.currentFairway.order && fairwayScore.userId == playerId ) {
                fairwayScore.score = score;
            }
        });
        */

        // Update fairway score
        _model.scores[playerId][this.state.currentFairway.order].throws = throws;
        
        // Update total round score
        let totalScore = 0;

        for(let fairwayOrder in _model.scores[playerId]) {
            totalScore += _model.scores[playerId][fairwayOrder].score || 0;
        }

        _model.scores[playerId].totalScore = totalScore;

        console.log('Input change');
        console.log(_model);

        this.setState({model: _model});
    }

    onProceed() {
        console.log('TODO: Save this to database: ');
        console.log(this.state.model);
    }

    render() {
        
        /*
        let currentFairwayId = 0;
        if(this.state.model.course.fairways.length > 0) {
            currentFairwayId = this.state.model.course.fairways[this.state.currentFairway]._id;
        }
        */

        return (
            <div className="Scorecard">
                <h2>Scorecard</h2>
                {this.state.model.course.name}
                <FairwayInfo fairways={this.state.model.course.fairways} currentFairway={this.state.currentFairway} onFairwayChanged={this.onFairwayChanged} />
                <PlayerList currentFairway={this.state.currentFairway} scores={this.state.model.scores} courseTotalPar={this.state.courseTotalPar} onScoreInputChange={this.onScoreInputChange} />
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
        let fairwayOrder = parseInt(event.target.getAttribute('data-order'));
        this.props.onFairwayChanged(fairwayOrder);
    }

    render() {
        let fairways = this.props.fairways;
        let currentFairway = this.props.currentFairway;

        return (
            <div className="fairway-info">
                <div className="fairway-indicator">
                    { fairways.map((f, i) => {
                        // Display current fairway with filled color dot
                        let className = (f.order != currentFairway.order) ? "dot" : "dot dot-active";
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
        //console.log(selection);
    }

    onScoreInputChange(event) {
        // Note the usage of dataset-object
        let playerId = event.target.dataset.playerId; // Refers to 'data-player-id'-propery of the element
        let score = parseInt(event.target.value);
        this.props.onScoreInputChange(playerId, score);
    }

    render() {
        
        let currentFairway = this.props.currentFairway;
        let scores = this.props.scores;
        let courseTotalPar = this.props.courseTotalPar;

        // Create table rows from round score data
        let tableRows = [];
        for(let playerId in scores) {
            
            let playerName = scores[playerId].userName;
            let score = scores[playerId][currentFairway.order].score;
            let ob = scores[playerId][currentFairway.order].ob;
            let totalScore = scores[playerId].totalScore;
            let differenceToFairwayPar = score - currentFairway.par;

            tableRows.push(
                <TableRow key={playerId}>                      
                    <TableRowColumn>{playerName}</TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" defaultValue="OB" readOnly={true} /></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" value={score || ''} data-player-id={playerId} onChange={this.onScoreInputChange}/></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" value={differenceToFairwayPar} readOnly={true}/></TableRowColumn>
                    <TableRowColumn className="input-column"><input type="text" className="read-only" value={totalScore} readOnly={true}/></TableRowColumn>
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


export default Scorecard;