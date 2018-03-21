import React, { Component } from 'react';
import Api from '../api/Api';
import '../App.css';
import { RaisedButton } from 'material-ui';


class Scorecard extends Component {

    constructor(props) {
        super(props);
        
        this.previousFairway = this.previousFairway.bind(this);
        this.nextFairway = this.nextFairway.bind(this);

        this.state = { course: {}, players: [], fairways: [], currentFairway: 0 };


        console.log('Scorecard.constructor');
    }

    componentWillReceiveProps(props) {
        console.log('Scorecard.componentWillReceiveProps');
        console.log(props);
    }

    componentDidMount() {
        let data = {
            course: {},
            players: [1, 2, 3],
            fairways: [1, 2, 3, 4, 5],
            currentFairway: 0

        };
        this.setState( data );
    }

    previousFairway() {
        let currentFairway = this.state.currentFairway;
        if(currentFairway > 0) currentFairway--;
        this.setState({currentFairway: currentFairway});
    }

    nextFairway() {
        let currentFairway = this.state.currentFairway;
        currentFairway++;
        this.setState({currentFairway: currentFairway});
    }

    render() {
        console.log('Screcard.render');
        console.log(this.props);
        
        let players = this.state.players;
        let course = this.state.course;
        let fairways = this.state.fairways;
        let currentFairway = this.state.currentFairway;

        let fairwayIndicator = (() => {
            let listItems = fairways.map((fairway, index) => {
                let className = (index == currentFairway) ? "dot active" : "dot"; 
                return (
                    <li key={index}>
                        <div className={className}></div>
                    </li>
                );
            });
            
            return (
                <ul>
                    {listItems}
                </ul>
            );
        })();

        let fairwayTitle = (()=> {
            return (
                <div>{currentFairway} | par 3</div>
            );
        })();
        
        let playerTable = (() => {

            let rows = players.map((player, index) => {
                return (
                    <tr key={index} className="foobar">
                        <td>{player}</td>
                        <td><input className="score-input" type="text"/></td>
                        <td><input className="score-input" type="text"/></td>
                        <td><input className="score-input" type="text"/></td>
                    </tr>
                );
            });

            return(
                <table>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            );
        })();

        let nextFairwayButton = (() => {
            return(
                <div></div>
            );  
        })();

        /*
        let keyboard = (() => {
            return (
                <div className="keyboard">
                    <div className="keyboard-row">
                        <div className="keyboard-col"><RaisedButton value="1" label="1" onClick={this.onKeyboardClick}/></div>
                        <div className="keyboard-col"><RaisedButton label="2" /></div>
                        <div className="keyboard-col"><RaisedButton label="3" /></div>
                        
                    </div>
                    <div className="keyboard-row">
                        <div className="keyboard-col"><RaisedButton label="4" /></div>
                        <div className="keyboard-col"><RaisedButton label="5" /></div>
                        <div className="keyboard-col"><RaisedButton label="6" /></div>
                    </div>
                    <div className="keyboard-row">
                    <div className="keyboard-col"><RaisedButton label="7" /></div>
                    <div className="keyboard-col"><RaisedButton label="8" /></div>
                    <div className="keyboard-col"><RaisedButton label="9" /></div>
                    </div>
                </div>
            );
        })();
        */

        return (
            <div className="Scorecard">
                <h2>Scorecard</h2>
                <div>
                    {fairwayIndicator}
                </div>
                {fairwayTitle}
                <div>
                    {playerTable}
                </div>
                <RaisedButton label="<" onClick={this.previousFairway} />
                <RaisedButton label=">" onClick={this.nextFairway} />
            </div>
        );
    }

}

export default Scorecard;