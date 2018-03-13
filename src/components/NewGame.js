import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class newGame extends Component {
    render() {
        return (
            <div>
                <h3>Play</h3>
                <p>You can play single course or attend to competition.</p>
                <Button>Single Course</Button>  <Button>Tournament</Button>
            </div>
        )
    }
}
export default newGame;
