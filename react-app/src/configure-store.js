import { compose, createStore, applyMiddleware } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic, rootReducer } from "./root";
import { browserHistory } from "react-router";
import { routerMiddleware } from "react-router-redux"

const epicMiddleware = createEpicMiddleware(rootEpic);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export default function configureStore() {
	const store = createStore(
		rootReducer,
		composeEnhancers(applyMiddleware(epicMiddleware, routerMiddleware(browserHistory)))
	);

	return store;
}
