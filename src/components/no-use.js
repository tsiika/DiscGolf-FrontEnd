import React, { Component } from 'react';
import {RaisedButton, Popover, Menu, MenuItem} from 'material-ui';

import WarnIcon from 'material-ui/svg-icons/alert/error-outline';

class App extends Component {
    constructor(props) {
		super(props);
		this.state={
            open: false,
        };
    }

    handleClick = (event) => {
        // This prevents ghost click.
        event.preventDefault();
    
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };
    
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };
    
    render() {
        return (
            <div>
            <RaisedButton icon={<WarnIcon/>} onClick={this.handleClick} labelColor="#FFF"backgroundColor="#FF0000">
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText='Following links are not working right now.' />
                        </Menu>
                    </Popover>
                </RaisedButton> 
            </div>
        );
    }
}

export default App;
