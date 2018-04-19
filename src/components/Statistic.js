import React, { Component } from 'react';
import { d3 } from 'd3';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';

const API = 'http://localhost:5000/api/v0/statistics/5ad72e0876e4056ff784106e';



class gameStats extends Component {
	constructor(props) {
		super(props);
		this.state={
			list:[]
		}
    }
    
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
    }
            
    
        
    render() {
        return (
            <div>
                <h1>Statistic</h1>
                    <h3>Played courses</h3>
                        
                <RaisedButton label="Show more" primary={true}></RaisedButton> 

                <div>
                    <p list={this.state.list}/>
                </div>
            </div>
        )
    }
}
export default gameStats;
