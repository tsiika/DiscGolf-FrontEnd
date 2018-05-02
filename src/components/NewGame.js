import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import SelectPlayers from './SelectPlayers';

const style = {
    margin: 12,
};

class NewGame extends Component {
    render() {
        /*trying to add a dialog to choose a single course or Tournamate
            the modifications are after the play header and before the 
            paragraph*/
            const playButton = withRouter(({ history }) => (
                <RaisedButton
                            label="Play"
                            type="button"
                            onClick={() => {history.push('/play') }}
                            backgroundColor="#a4c639" /> 
            ));
        return (
            <div>
                <playButton/>
                <h3>Play</h3>
                <SelectPlayers />
                <p>You can play single course or attend to competition.</p>
                <RaisedButton label="Single Course" primary={true} style={style}></RaisedButton> 
                <RaisedButton label="Tournament" primary={true} style={style}></RaisedButton>
            </div>
        )
    }
}
export default NewGame;
