import React from 'react';

import { compose, createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
// import { rootEpic, rootReducer } from "./root";
import { createHistory } from 'history';

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Compose reduxReactRouter with other store enhancers
// const store = compose(
// 	applyMiddleware(m1, m2, m3),
// 	reduxReactRouter({
// 		routes,
// 		createHistory
// 	}),
// 	devTools()
// )(createStore)(reducer);


export default function configureStore() {
	const store = compose(
		rootReducer
	)(createStore)


	createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(epicMiddleware))
	);

	return store;
}
