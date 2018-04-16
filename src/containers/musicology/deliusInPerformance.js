import React, { Component } from 'react';
import App from '../app';

export default class DeliusEssay extends Component { 
	constructor(props) {
		super(props);
	}
	
	render() { 
		return (
		  <div> 
		  	<link rel="stylesheet" href="../../style/DeliusEssay.css" type="text/css" />
		  	<App graphUri="http://meld.linkedmusic.org/annotations/delius-in-performance.json-ld" />
      </div>
		);
	}
	
};



