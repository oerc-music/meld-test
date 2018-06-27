import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { Router, Route, browserHistory } from 'react-router'

import {reducers, addReducerSet} from 'meld-clients-core/src/reducers';
import pieceReducers  from './reducers/piece_relations';
addReducerSet('pieces', pieceReducers);
import App from './containers/app';
import DeliusEssay from './containers/musicology/deliusInPerformance';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Router history={browserHistory}> 
			<Route path="/" component={DeliusEssay} />
		</Router>
	</Provider>
	, document.querySelector('.container'));
