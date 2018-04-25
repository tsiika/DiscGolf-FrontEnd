import React, { Component } from 'react';
import CourseCard from './CourseCard';

export default class NearbyTab extends React.Component {
	render(){
		return(
			<div>
			<CourseCard />
            <CourseCard />
            <CourseCard />
            <CourseCard />
            </div>
			);
	}
}