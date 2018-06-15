import update from 'immutability-helper';
import { FETCH_TARGET_EXPRESSION, FETCH_GRAPH } from 'meld-clients-core/src/actions/index';

const INIT_STATE = {
	pieces: {}
};


export default function(state = INIT_STATE, action){
	console.log("action", action);
	switch (action.type){
		case FETCH_TARGET_EXPRESSION:
			var payload = action.payload;
			console.log("We're looking at a payload", payload);
			var pieceId = payload['@id'];
			var embodimentList = [];
			if("frbr:embodiment" in payload){
				var embodiments = payload['frbr:embodiment'];
				for(var i=0; i<embodiments.length; i++){
					if('frbr:embodiment' in embodiments[i]){
						embodimentList.push(embodiments[i]['frbr:embodiment']['@id']);
					}
				}
			}
			var entry = {};
			entry[pieceId] = embodimentList;
			return update(state, {pieces: {$merge: entry}});
		case FETCH_GRAPH:
			var payload = action.payload;
			console.log("And now, we're looking at a payload of", payload);
		default:
			return state;
	} 
}
