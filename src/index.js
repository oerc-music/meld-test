import React, { Component }  from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ReduxPromise from 'redux-promise';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {reducers, addReducerSet} from 'meld-clients-core/src/reducers';
import pieceReducers  from './reducers/piece_relations';
addReducerSet('pieces', pieceReducers);
import App from './containers/app';
import MeldTest from './containers/meldtest';

const createStoreWithMiddleware = applyMiddleware(thunk, ReduxPromise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<Route path="/" component={MeldTest} />
		</BrowserRouter>
	</Provider>
	, document.querySelector('.container'));
