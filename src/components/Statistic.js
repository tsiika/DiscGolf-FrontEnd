import React, { Component } from 'react';
import {RaisedButton, Popover, Menu, MenuItem} from 'material-ui';

import WarnIcon from 'material-ui/svg-icons/alert/error-outline';

//const API = 'http://localhost:5000/api/v0/statistics/';



class gameStats extends Component {
	constructor(props) {
		super(props);
		this.state={
            list:[],
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
    
    /*
    componentDidMount() {
        this.getCourses();
    }

    
    getCourses = () => {
        let fetchObj = {
            method: "GET",
            mode: "cors",
            headers: {"Content-Type":"application/json"}
        }
        fetch(API, fetchObj).then((response)=> {
            if(response.ok) {
                response.json()
                    .then((data)=> {
                        console.log(data);
                        this.setState({
                            list:data.data
                        });
                    });
            }
        }).catch((error) => {
            console.log("Error:"+error);
        })
    }*/
            
    
        
    render() {
        return (
            <div>
                <h1>Statistic</h1>
                    <h3>Played courses</h3>
                        
                <RaisedButton label="Show more" icon={<WarnIcon/>} onClick={this.handleClick} labelColor="#FFFFFF" backgroundColor="#00B5CC">
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}
                    >
                        <Menu>
                            <MenuItem primaryText='This module is not in use at the moment.' />

                        </Menu>
                    </Popover>
                </RaisedButton> <br/><br/>

                {/*
                <div>
                    <p list={this.state.list}/>
                </div>*/}
            </div>
        )
    }
}
export default gameStats;
