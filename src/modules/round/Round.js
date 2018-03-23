import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NoMatch from '../../components/404';

import Api from  '../../api/Api';

import '../../App.css';
import '../../Round.css';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { RaisedButton } from 'material-ui';

import RoundModel from '../../models/RoundModel';
import Scorecard from '../../components/round/Scorecard';

/*
*   Round - module
*
*   Renders course selection, player selection and scorecard.
*
*   At the moment the idea is that, initial round data-model is build after choosing the course and players, and passed on the
*   Scorecard, which handles updating and saving it. But this might change...
*
*   
*   TODO: CourseSelection, PlayerSelection and Scorecard should separated into their own component-files(node modules).
*         ...or probably as modules rather than components.
*         (Sidenote: 'modules', is not the best name for component category as it mixes with Node module, 'containers' might be better)
*
*   TODO: Do view switching by redirecting to corresponding location (or by pushing history or etc.),
*         so that it would possible to go back to previous view with browser back-button.
*         ...or at least do a confirmation check for preventing unwanted page leave.
* 
*/
class Round extends Component {
    
    constructor(props) {
        super(props);

        this.onCourseSelected = this.onCourseSelected.bind(this);
        this.onPlayersSelected = this.onPlayersSelected.bind(this);

        let _model = new RoundModel();
        this.state = {model: _model, courseSelected: false, playersSelected: false};
    }

    onCourseSelected(_course) {
        let _model = this.state.model;
        _model.course = _course;
        this.setState( { model: _model, courseSelected: true } );
    }

    /* Handles proceeding from player selection */
    onPlayersSelected(_players) {

        // Update players to data model
        let _model = this.state.model;
        _model.players = _players;

        // Create initial fairwayScores-object to model
        _model.fairwayScores = [];

        // Note that we store also the username for convenience, as we need it while listing players on the scorecard
        _model.course.fairways.forEach((fairway) => {
            _model.players.forEach((player) =>{
                _model.fairwayScores.push({
                    fairwayId: fairway._id,
                    userId: player._id,
                    userName: player.username,
                    score: null,
                    ob: null
                });
            })
        });

        this.setState( { model: _model, playersSelected: true } );
    }

    render() {

        let match = this.props.match;

        return(
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div style={{maxWidth: '750px'}}>
                <Switch>
                    <Route exact path={match.url + "/"} render={
                        () => {
                            // TODO: Do view switching by redirecting to corresponding location (or by pushing history or etc.),
                            // so that it would possible to go back to previous view with browser back-button.
                            
                            if(!this.state.courseSelected) {
                                return <CourseSelection onCourseSelected={this.onCourseSelected} />
                                //return <Redirect to={match.url + "/course"} />
                            } else if(!this.state.playersSelected) {
                                return <PlayerSelection onPlayersSelected={this.onPlayersSelected} />
                            } else {
                                return <Scorecard model={this.state.model} />
                            }

                            /*
                            return (
                                <div>
                                <CourseSelection onCourseSelected={this.onCourseSelected} />
                                <PlayerSelection onPlayersSelected={this.onPlayersSelected} />
                                <Scorecard model={this.state.model} onScoreInputChange={this.onScoreInputChange}/>
                                </div>
                            )
                            */
                        }
                    }/>
                    {/*
                    <Route exact path={match.url + "/course"} render={ () => (<CourseSelection onCourseSelected={this.onCourseSelected} />) } />
                    <Route exact path={match.url + "/players"} component={PlayerSelection} />
                    */}
                    <Route component={NoMatch}/>
                </Switch>
                </div>
            </div>
        );
    }
}

/*
*   CourseSeletion - component
*
*   @props  onCourseSelected    Function for handling the proceed button event
* 
*   TODO: Course search
*   TODO: Courses could be displayed in grid rather than table (would fit more)
*/
class CourseSelection extends Component {
    
    constructor(props) {
        super(props);

        this.onCoursesReceived = this.onCoursesReceived.bind(this);
        this.onCourseSelected = this.onCourseSelected.bind(this);
        this.onProceed = this.onProceed.bind(this);
        
        this.state = { courseSelected: false };
    }

    componentDidMount() {

        Api.fetchCourses().then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            this.onCoursesReceived(jsonResponse);
        }).catch((reason) => {
            console.error(reason);
        });
    }

    onCoursesReceived(_courses) {
        this.setState({courses: _courses});
    }

    onCourseSelected(selection) {
        this.setState({selectedCourse: selection, courseSelected: true});
    }

    onProceed() {
        // Note that this.state.selectedCourse only contains the index of the selected row
        this.props.onCourseSelected( this.state.courses[this.state.selectedCourse] );
    }

    render() {
        
        let courses = this.state.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => {
                let selected = ( parseInt(this.state.selectedCourse) === index ) ? true : false;                
                return (                    
                    <TableRow key={course._id} selected={selected}>
                        <TableRowColumn>{course.name}</TableRowColumn>
                        <TableRowColumn>{course.description}</TableRowColumn>
                        <TableRowColumn>{ (course.fairways) ? course.fairways.length : 0 }</TableRowColumn>
                    </TableRow>
                );
            });
        }

        return (
            <div>
                <h2>Choose course</h2>
                <Table selectable={true} multiSelectable={false} onRowSelection={this.onCourseSelected}>
                    <TableHeader displaySelectAll={false} enableSelectAll={false}>
                        <TableRow>                    
                            <TableHeaderColumn>name</TableHeaderColumn>
                            <TableHeaderColumn>description</TableHeaderColumn>
                            <TableHeaderColumn>fairways</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false} deselectOnClickaway={false}>
                        {tableRows}
                    </TableBody>
                </Table>
                <RaisedButton primary={true} label="Proceed" onClick={this.onProceed} disabled={!this.state.courseSelected} />
            </div>
        );
    }
}

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
        
        this.state = {players: [], selectedPlayers:[], playersSelected: false};
    }

    componentDidMount() {

        Api.fetchUsers().then((response) => {
            return response.json();
        }).then((jsonResponse) => {
            this.onPlayersReceived(jsonResponse);
        }).catch((reason) => {
            console.error(reason);
        });
    }

    onPlayersReceived(_players) {
        this.setState({players: _players});
    }

    onPlayerSelected(_selections) {
        // Note: _selections contains only indices of the row items, not player data-objects
        this.setState({selectedPlayers: _selections, playersSelected: (_selections.length > 0) ? true : false });
    }

    onProceed() {
        // We have to map the objects from state.players-array, because state.selectedPlayers only contains indices of the selected rows
        let selectedPlayers = this.state.selectedPlayers.map(i => this.state.players[i]);
        this.props.onPlayersSelected(selectedPlayers);
    }

    render() {
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

export default Round;