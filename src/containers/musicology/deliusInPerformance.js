import React, { Component } from 'react';
import App from '../app';

export default class DeliusEssay extends Component { 
	constructor(props) {
		super(props);
		this.state={
			definition: false,
			show: false,
			highlight: false
		}
	}
	updateViewer(show, highlight){
		this.setState({show: show, highlight: highlight});
	}
	currentDefinition(definition){
		if(this.state){
			this.setState({definition: definition});
		}
	}
	clearDefinition(){
		this.setState({definition: false});
	}
	render() {
		var show = (this.state && this.state.show) ? this.state.show : false;//["https://meld.linkedmusic.org/resources/images/Illustration.jpg"];
		var highlight = this.state && this.state.highlight ? this.state.highlight : false;
		return (
		  <div> 
		  	<link rel="stylesheet" href="../../style/DeliusEssay.css" type="text/css" />
		  	<link rel="stylesheet" href="../../style/react-borealis.css" type="text/css" />
		  	<App graphUri="http://meld.linkedmusic.org/annotations/delius-in-performance.json-ld"show={show} highlight={highlight}
			updateViewer={this.updateViewer.bind(this)} definition={this.state.definition}
			currentDefinition={this.currentDefinition.bind(this)}
			clearDefinition={this.clearDefinition.bind(this)}
			annotation={ this.props.location.query.annotation } />
      </div>
		);
	}
	
};



