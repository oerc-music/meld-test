// IF SELF-HOSTING, UPDATE THE FOLLOWING URI TO POINT TO YOUR meld-test.json-ld 
const graphUri = 'http://meld.linkedmusic.org/resources/test/meld-test.json-ld'
//*****************************************************************************


import React, { Component } from 'react';
import { parse } from 'querystring';
import App from './app';


export default class MeldTest extends Component { 
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
		var show = (this.state && this.state.show) ? this.state.show : false;
		var highlight = this.state && this.state.highlight ? this.state.highlight : false;
		const qpars = parse(this.props.location.search.slice(1)); 
		const annotation = "annotation" in qpars ? qpars["annotation"] : "";
		return (
		  <div> 
		  	<link rel="stylesheet" href="../../style/MeldTest.css" type="text/css" />
		  	<App graphUri={graphUri} show={show} highlight={highlight}
			updateViewer={this.updateViewer.bind(this)} definition={this.state.definition}
			currentDefinition={this.currentDefinition.bind(this)}
			clearDefinition={this.clearDefinition.bind(this)}
			annotation={ annotation } />
      </div>
		);
	}
	
};



