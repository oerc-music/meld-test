import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTEI } from 'meld-clients-core/src/actions/index';
import { 
	MARKUP_EMPHASIS, 
	handleEmphasis,
	MARKUP_HIGHLIGHT,
	handleHighlight,
	MARKUP_HIGHLIGHT2,
	handleHighlight2,
	CUE_IMAGE,
	handleCueImage
} from 'meld-clients-core/src/actions/meldActions';

class TEI extends Component { 
	constructor(props) { 
		super(props);

		this.state = {
			definition: false,
			tei: {},
            annotations:{},
			scrollTop: 0 
        };
	}

  scrollToMotif(motifNo){
		console.log("scrolling");
		var targetClass = "annotation__AskingForbidden_"+motifNo+"_1";
		var textBox = ReactDOM.findDOMNode(this);
		var targetElements = textBox.getElementsByClassName(targetClass);
		if(targetElements.length){
			 targetElements[0].scrollIntoView;
			 textBox.scrollTop = targetElements[0].offsetTop - textBox.offsetTop + (textBox.clientHeight / 2);
		}
	}
	setCSSProp(selector, obj){
		var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
		var i=0;
		while(i<rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector)===-1)){
			i++;
		}
		if(i==rules.length) {
			//insert rules
			console.log(selector+" {display: visible}");
      document.styleSheets[0].insertRule(selector+" {display: visible}");
			var i=0;
			while(i<rules.length && (!rules[i].selectorText || rules[i].selectorText.indexOf(selector)===-1)){
				i++;
			}
		}
		
		var declaration = rules[i].style;
		var newRules = Object.keys(obj);
		for(var j=0; j<newRules.length; j++){
			declaration.setProperty(newRules[j], obj[newRules[j]]);
		}
	}
	resize(){
		var newHeight = this.props.height;
		var newWidth = this.props.width-50;
		var defWidth = Math.max(newWidth/6, 100);
		var mainWidth = newWidth - defWidth-100;
		this.setCSSProp('.TEIContainer.commentary', {width: newWidth+'px', height: newHeight+'px'});
	}
	
	render() {
		var sheet = document.styleSheets[0];
		var rules = sheet.cssRules || sheet.rules;
		this.resize();
		if(this.props.highlight) this.showHighlights(this.props.highlight) 
		if(Object.keys(this.props.tei.TEI).length && this.props.uri in this.props.tei.TEI) {
			return <div dangerouslySetInnerHTML={ this.returnHTMLizedTEI() } className="TEIContainer commentary" id={this.props.uri.substr(this.props.uri.indexOf("/")+1)} />;
		}
		return <div> Loading TEI... </div>;
	}

	componentDidMount() {
		this.props.fetchTEI(this.props.uri);
	}

	returnHTMLizedTEI() {
		return {__html: this.props.tei.TEI[this.props.uri].innerHTML};
	}

	componentDidUpdate() {
		if(this.props.motif && this.props.uri.indexOf("commentaries")===-1){
			this.scrollToMotif(this.props.motif);

		}
		var mc = this.props.onMotifChange;
		/*
		ReactDOM.findDOMNode(this).onclick = function(e){
			var target = e.target;
			if(target && target.className.match(/F[0-9]+/).length){
				mc(target.className.match(/F[0-9]+/)[0]);
			}
			}*/
		this.props.annotations.map( (annotation) => {
			// each annotation...
			if(Object.keys(this.props.tei.componentTargets).length){
				const frags = annotation["oa:hasTarget"].map( (annotationTarget) => {
					// each annotation target
					if(annotationTarget["@id"] in this.props.tei.componentTargets) {
						// if this is my target, grab any of MY fragment IDs
						const myFrags = this.props.tei.componentTargets[annotationTarget["@id"]]
									.filter( (frag) => {
																			return frag.substr(0, frag.indexOf("#")) === this.props.uri;
																		 });
						if(myFrags.length) {
							// and apply any annotations
							this.handleMELDActions(annotation, myFrags);
						}
					}
				});
			} else {
				for(var i=0; i<annotation['oa:hasBody'].length; i++){
					var actionAnnotation = annotation['oa:hasBody'][i];
					var myFrags = actionAnnotation['oa:hasTarget'].filter( (frag) =>{
						return frag['@id']===this.props.uri ||
							(frag['@id'].indexOf('#')>-1 &&
							 (frag['@id'].substr(0, frag['@id'].indexOf("#")) === this.props.uri) || frag['@id'].substr(0, 1)==="#") || frag['@id'].indexOf('dbp')>-1;});
					if(myFrags.length){
						this.handleMELDActions(actionAnnotation, myFrags);
					}
				}
			}
		});
	}
	definitionFun(definition){
		var fun = this.props.currentDefinition;
		return function(){
			fun(definition);
		}
	}
	updateViewerFun(show, highlight){
		var fun = this.props.updateViewer.bind(this);
		return function(){
			fun(show, highlight);
		}
	}
	cancelHighlights(){
		var rules = document.styleSheets[0].cssRules || document.styleSheets[0].rules;
		var i=0;
		for(var i=rules.length-1; i>=0; i--){
			if(rules[i].selectorText && rules[i].selectorText.indexOf('temporary')>-1){
				document.styleSheets[0].deleteRule(i);
			}
		}
	}
	addHighlight(highlight){
		var highlightfrag = highlight.substring(highlight.indexOf('#'));
		console.log("###", highlightfrag);
		this.setCSSProp('.temporary, '+highlightfrag, {fill: "blue", stroke: "blue !important", color: "blue"});
	}
	showHighlights(highlight){
		this.cancelHighlights();
		for(var i=0; i<highlight.length; i++){
			this.addHighlight(highlight[i]);
		}
	}
	handleMELDActions(annotation, fragments) {
		console.log("processing annotation: ", annotation, "oa:motivatedBy" in annotation ? annotation["oa:motivatedBy"][0]["@id"] :  "without motive");
		if("oa:motivatedBy" in annotation){
			switch(annotation["oa:motivatedBy"][0]["@id"]){
				case "meldterm:updateViewerState":
					var show = [];
					var highlight = [];
					for(var i=0; i<annotation["oa:hasBody"].length; i++){
						var thing = annotation["oa:hasBody"][i];
						if(thing["@id"]) show.push(thing["@id"]);
						if(thing["meldterm:highlight"]) highlight = highlight.concat(thing["meldterm:highlight"]);
					}
					for(var i=0; i<fragments.length; i++){
						var fragFullString = fragments[i]['@id'];
						var fragString = fragFullString.substring(fragFullString.indexOf("#")+1);
						var el = document.getElementById(fragString);
						if(el) {
							console.log("Adding event listener", show, highlight);
							el.onclick = this.updateViewerFun(show, highlight);
						}
					}
					break;
				case "meldterm:definition":
					var definition = {definition: annotation["oa:hasBody"][0].definition};
					for(var i=0; i<fragments.length; i++){
						var fragString = fragments[i]['@id'];
						var terms = document.getElementsByTagName("tei-term");
						for(var j=0; j<terms.length; j++){
							if(terms[j].getAttribute("ref")===fragString){
								var el = terms[j];
								definition.head = el.innerHTML;
								if(el) {
									var defFun = this.definitionFun(definition);
									el.onmouseenter = defFun;
									el.onmouseleave = this.props.clearDefinition;
									el.ontouchstart = defFun;
									el.ontouchend = this.props.clearDefinition;
								}
							}
						}
					}
					break;
				case "meldterm:personInfo":
					var definition = { definition: annotation["oa:hasBody"][0].definition,
														 head: annotation["oa:hasBody"][0].head };
					for(var i=0; i<fragments.length; i++){
						var fragString = fragments[i]['@id'];
						var terms = document.getElementsByTagName("tei-persName");
						console.log(terms);
						for(var j=0; j<terms.length; j++){
							if(terms[j].getAttribute("ref")===fragString){
								var el = terms[j];
								if(el) {
									var defFun = this.definitionFun(definition);
									el.onmouseenter = defFun;
									el.onmouseleave = this.props.clearDefinition;
									el.ontouchstart = defFun;
									el.ontouchend = this.props.clearDefinition;
								}
							}
						}
					}
					break;
			}
		} else if("oa:hasBody" in annotation) {
			annotation["oa:hasBody"].map( (b) => {
				// TODO convert to switch statement
				if(b["@id"] === MARKUP_EMPHASIS) { 
					this.props.handleEmphasis(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
				} else if(b["@id"] === MARKUP_HIGHLIGHT) { 
					this.props.handleHighlight(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
				} else if(b["@id"] === MARKUP_HIGHLIGHT2) { 
					this.props.handleHighlight2(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments);
				} else if(b["@id"] === CUE_IMAGE) {
					this.props.handleCueImage(ReactDOM.findDOMNode(this), annotation, this.props.uri, fragments, this.props.tei.fragImages);
				} 
				else {
					console.log("TEI component unable to handle meld action: ", b);
				}
			});
		}
		else { console.log("Skipping annotation without body: ", annotation) }
	}
}

function mapStateToProps({ tei }) { 
	return { tei }; 
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchTEI, handleEmphasis, handleCueImage, handleHighlight, handleHighlight2 }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TEI);

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.lastIndexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
