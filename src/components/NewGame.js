import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                <Link to='/round'>
                    <RaisedButton label="Single Round" primary={true} style={style}></RaisedButton> 
                </Link>
                <RaisedButton label="Tournament" primary={true} style={style}></RaisedButton>
            </div>
        )
    }
}
export default newGame;
