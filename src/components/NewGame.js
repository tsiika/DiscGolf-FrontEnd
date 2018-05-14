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
                <h1>Play</h1>
                <h3>Start playing new round!</h3>
                <Link to='/round/course'>
                    <RaisedButton label="Single Round" style={style} labelColor="#FFFFFF" backgroundColor="#00B5CC"></RaisedButton> 
                </Link>
            </div>
        )
    }
}
export default newGame;
