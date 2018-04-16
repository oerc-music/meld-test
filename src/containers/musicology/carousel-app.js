import React, { Component } from 'react';
import App from '../app';

export default class ForbiddenQuestion extends Component { 
	constructor(props) {
		super(props);
	}
	

	render() {
		var motif = this.props.location.query.motif || 'F1';
		console.log(this.props.location);
		return (
		  <div> 
		  	<link rel="stylesheet" href="../../style/carousel.css" type="text/css" />
		  	<App graphUri="http://meld.linkedmusic.org/annotations/FrageverbotCarousel.json-ld"
						 motif={motif} location={this.props.location}/>
      </div>
		);
	}
	
};



