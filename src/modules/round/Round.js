import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, match } from 'react-router-dom';
import NoMatch from '../../components/404';

import Api from  '../../api/Api';

import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import { TextField, RaisedButton } from 'material-ui';

import RoundModel from '../../models/RoundModel';

import CourseTable from '../../components/admin/CourseTable';

class Round extends Component {
    
    constructor(props) {
        super(props);

        this.onCourseSelected = this.onCourseSelected.bind(this);
        this.onPlayersSelected = this.onPlayersSelected.bind(this);

        let _model = new RoundModel();
        this.state = {model: _model};
    }

    onCourseSelected(_course) {
        let _model = this.state.model;
        _model.course = _course;
        this.setState( { model: _model } );
    }

    onPlayersSelected(_players) {
        let _model = this.state.model;
        _model.players = _players;
        this.setState( { model: _model } );
    }

    render() {

        let match = this.props.match;

        return(
            <Switch>
                <Route exact path={match.url + "/"} render={
                    () => {
                        
                        if(!this.state.model.course) {
                            return <CourseSelection onCourseSelected={this.onCourseSelected} />
                        } else if(!this.state.model.players) {
                            return <PlayerSelection onPlayersSelected={this.onPlayersSelected} />
                        } else {
                            return <SCORECARD model={this.state.model} />
                        }
                    }
                }/>
                <Route exact path={match.url + "/course"} component={CourseSelection} />
                <Route exact path={match.url + "/players"} component={PlayerSelection} />
                
                <Route component={NoMatch}/>
            </Switch>
        );
    }
}

class RoundContainer extends Component {

    render() {
        return(
            <div><h2>Round container</h2></div>
        );
    }
}

class CourseSelection extends Component {
    
    constructor(props) {
        super(props);
        this.onCoursesReceived = this.onCoursesReceived.bind(this);
        this.onCourseSelected = this.onCourseSelected.bind(this);
        this.state = {};
    }

    componentDidMount() {

        let courses = Api.fetchCourses().then((response) => {
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
        let course = this.state.courses[selection];
        this.props.onCourseSelected(course);
    }

    render() {
        
        let courses = this.state.courses;
        let tableRows = '';

        if(courses && courses.length > 0) {
            
            tableRows = courses.map((course, index) => {                
                return (                    
                    <TableRow key={course._id}>
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
            </div>
        );
    }
}

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
                let selected = ( this.state.selectedPlayers.indexOf(index) != -1 ) ? true : false;
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
                <RaisedButton label="Proceed" onClick={this.onProceed} disabled={!this.state.playersSelected} />
            </div>
        );
    }
}

class SCORECARD extends Component {
    render() {
        console.log(this.props.model);
        return (
            <div><h2>SCORECARD</h2></div>
        );
    }
}

export default Round;