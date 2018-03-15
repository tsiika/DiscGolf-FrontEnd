import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};

class newGame extends Component {
    render() {
        return (
            <div>
                <h3>Play</h3>
                <p>You can play single course or attend to competition.</p>
                <RaisedButton label="Single Course" primary={true} style={style}></RaisedButton>  <RaisedButton label="Tournament" primary={true} style={style}></RaisedButton>
            </div>
        )
    }
}
export default newGame;
