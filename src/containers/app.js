import React, { Component } from 'react';
import { connect } from 'react-redux' ;
import { bindActionCreators } from 'redux';
//import IIIFImage from 'react-iiif-image';
import MediaPlayer from '../components/mediaPlayer';
import AudioPlayer from '../components/audioPlayer';
//import ReactOpenSeadragon from 'react-openseadragon';

import Score from 'meld-clients-core/src/containers/score';
import TEI from '../containers/tei';
import MyImage from 'meld-clients-core/src/containers/image';
import MEICarousel from '../containers/carousel';
import MEITimeline from '../containers/timeline';
import TwinControls from '../containers/controls';
import SingleControls from '../containers/single-view-controls';
import { OpenSeaDragonContainer } from '../containers/sea';
import { fetchGraph, fetchTargetExpression } from 'meld-clients-core/src/actions/index';

const MEIManifestation = "meldterm:MEIManifestation";
const TEIManifestation = "meldterm:TEIManifestation";
const IIIFManifestation = "meldterm:IIIFManifestation";
const VideoManifestation = "meldterm:VideoManifestation";
const AudioManifestation = "meldterm:AudioManifestation";
const ImageManifestation = "meldterm:ImageManifestation";
const Carousel= "meldterm:MEICarousel";
const CarouselClassic= "meldterm:MEIClassicCarousel";
const FOR_ORCHESTRA = "http://id.loc.gov/authorities/performanceMediums/2013015516";
const HAS_PIANO = "http://id.loc.gov/authorities/performanceMediums/2013015550";

class App extends Component { 
	constructor(props) {
		super(props);
	}
 
	componentDidMount() { 
		window.addEventListener("resize", this.updateDimensions.bind(this));
		if(this.props.graphUri) { 
			const graphUri = this.props.graphUri;
			this.props.fetchGraph(graphUri);
		}
	}
	highlightMyHighlights(){
		if(this.props.highlight) this.highlightThings(this.props.highlight);
	}
	highlightThings(highlight){
		if(highlight) {
			var found = 0;
			for(var i=0; i<highlight.length; i++){
				var uri = highlight[i];
				var frag = uri.substring(uri.indexOf("#")+1);
				var el = document.getElementById(frag);
				if(el) {
					el.classList.add("meld-highlight");
					found++;
				}
			}
			if(found===0) {
				// Fixme: this is very trusting!
				console.log("broken");
				window.setTimeout(this.highlightThings.bind(this, highlight), 500);
			} 
		}
	}
	componentDidUpdate(){
		if(this.props.highlight){
//			window.setTimeout(this.highlightMyHighlights.bind(this), 250);
		}
	}

  updateDimensions() {
    this.setState({width: document.documentElement.clientWidth, height: document.documentElement.clientHeight});
  }
  componentWillMount() {
    this.updateDimensions();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
	updateViewer(show, highlight){
		this.props.updateViewer(show, highlight);
	}
	render() { 
		// Build an array of JSX objects corresponding to the annotation targets in our topLevel
		var stripHeight = Math.max(this.state.height/4, 250);
		var scale = 0.25;
		var vrvOptions = {
			breaks: 'auto',
			ignoreLayout: 0,
			adjustPageHeight:1,
			spacingStaff: 0,
			spacingSystem: 4,
			spacingLinear: 0.2,
			spacingNonLinear: 0.55,
			noFooter: true,
			noHeader: 1,
			scale: scale*100,
			pageHeight: (this.state.height - stripHeight - 80) / scale,
			pageWidth: ((this.state.width -200) / 2 ) / scale - 50
		}
		if(this.props.graph.targetsById) { 
			console.log("Props: ", this.props, this.state);
			var show = this.props.show;
			var highlight = this.props.highlight;
      const byId = this.props.graph.targetsById;
			if(this.props.annotation && !show){
				if(!show) show = [];
				var allAnnotations = this.props.graph.annoGraph["ldp:contains"][0]["oa:hasBody"];
				for(var i=0; i<allAnnotations.length; i++){
					if(this.props.annotation===allAnnotations[i]['@id']){
						var activeAnnotation = allAnnotations[i]['oa:hasBody'];
						for(var j=0; j<activeAnnotation.length; j++){
							show.push(activeAnnotation[j]['@id']);
							if(activeAnnotation[j]['meldterm:highlight']){
								if(!highlight) highlight = [];
								highlight = highlight.concat(activeAnnotation[j]['meldterm:highlight']);
							}
						}
						window.setTimeout(this.highlightThings.bind(this, highlight), 400);
						break;
					}
				}
			}
			return ( 
				<div className="wrapper">
					<link rel="stylesheet" href="../style/style.css"/>
					<link rel="stylesheet" href="../style/CETEIcean.css"/>
					{ this.props.definition ?
						<div id="defTarget"><h3>{this.props.definition.head}</h3><p>{this.props.definition.definition}</p></div>
						: <div/> }
					{Object.keys(byId).map( (id) => {
						var applies = (show && show.indexOf(id)!==-1);
					switch(byId[id]["type"]) { 
						case MEIManifestation:
							if(applies) {
								return <Score key={ id } uri={ id } options={vrvOptions} annotations={ byId[id]["annotations"] } />;
							} else break;;
						case TEIManifestation:
							return <TEI key={ id } uri={ id } height={ stripHeight } width={this.state.width} annotations={ byId[id]["annotations"] }  updateViewer={ this.updateViewer.bind(this) }  highlight={ highlight } currentDefinition={ this.props.currentDefinition } clearDefinition={this.props.clearDefinition} annotation={ this.props.annotation }/>;
						// case IIIFManifestation:
						// 	return <IIIFImage key={ id } server={ id } height={ stripHeight } width={this.state.width} annotations={ byId[id]["annotations"] } />;
						case VideoManifestation:
							return <MediaPlayer key={ id } uri={ id } />;
						case AudioManifestation: 
              return <AudioPlayer key={ id } uri={ id } />;
						case ImageManifestation:
							if(applies) 
								return <MyImage key={ id } uri={ id } height={ this.state.height - stripHeight -30 } width={this.props.show.length>1 ? (this.state.width-80) / 2 : this.state.width-80} />;
							else break;
						case IIIFManifestation:
							if(applies) 
								return <OpenSeaDragonContainer
							server="https://stacks.stanford.edu/image/iiif"
							key={ id } id="hg676jb4964%2F0380_796-44"
							json="info.json" type={'legacy-image-pyramid'} />;
							
					}
				})}
				</div>
			);
		}
		return (<div> Loading...  </div>);
	}	
};


function mapStateToProps({ graph , score, pieces}) {
	return { graph , score , pieces};
}

function mapDispatchToProps(dispatch) { 
	return bindActionCreators({ fetchGraph, fetchTargetExpression }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


											/*
              return <ReactOpenSeadragon basename="https://libimages1.princeton.edu/loris/pudl0001%2F4609321%2Fs42%2F00000001.jp2" osdConfig={ {
								setStrings: [{name: 'Tooltips.Home', value: 'Reset'}],
								defaultZoomLevel: 0,
								tileSources: [
									'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
									'https://cdm16022.contentdm.oclc.org/digital/iiif/p16022coll7/326/info.json',
        'https://cdm16022.contentdm.oclc.org/digital/iiif/nemhc/1542/info.json',
        'https://cdm16022.contentdm.oclc.org/digital/iiif/hchm/1410/info.json',
									'https://cdm16022.contentdm.oclc.org/digital/iiif/hchm/1333/info.json',
									'https://cdm16022.contentdm.oclc.org/digital/iiif/hchm/1332/info.json',
								],
							}}
							pages={[
      {
        id: 0,
        title: 'MLK',
        sidebarThumbnail: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/full/100,/0/default.jpg',
        transcript: 'MLK',
        viewer: 'OSD_VIEWER',
        cdmCollection: 'mpls',
        cdmIdentifier: '3188',
        infoURL: 'https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json',
      }]} key={ id } />;
						default: 
							return <div key={ id }>Unhandled target type: { byId[id]["type"] }</div>
					}
				})}
				</div>*/
