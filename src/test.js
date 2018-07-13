import React, { Component } from 'react';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import IIIFTileLayer from 'react-leaflet-iiif'
import Leaflet from 'leaflet'


export default class Test extends Component { 
	constructor(props) {
		super(props);
		this.state = { 
			lat: 0,
			lng: 0,
			zoom:13
		}
	}

	render() { 
			const position=[this.state.lat, this.state.lng];
			return ( 
				<div className="wrapper">
					<link rel="stylesheet" href="../style/iiif.css"/>
					<link rel="stylesheet" href="../style/leaflet.css"/>
					<div className="mapContainer">
						<Map className="map" center={position} zoom={this.state.zoom} crs={Leaflet.CRS.Simple}>
							<IIIFTileLayer
								url="https://stacks.stanford.edu/image/iiif/hg676jb4964%2F0380_796-44/info.json"
							/>
						</Map>
					</div>
				</div>
			)
	}	
};

