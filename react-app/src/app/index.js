import React, { Component } from "react"
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux"
import { combineEpics } from "redux-observable";
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from "./reducer";

import { auth0AuthenticateEpic, auth0LogoutEpic, auth0CallbackEpic } from "../auth0";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"

import { AUTH_CONFIG } from "./config";

import "./style.css";

/* App Components */
import Auth from "../auth0";
import Root from "./root";
import Home from "./home";
import HdocViewer from "../hdocs";
import ErrorPage from "./error";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootEpic = combineEpics(auth0AuthenticateEpic, auth0LogoutEpic, auth0CallbackEpic);
const epicMiddleware = createEpicMiddleware(rootEpic)

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(epicMiddleware))
);

class App extends Component {
	render() {

		return (<Provider store={store}>
			<Router>
				<Root {...this.props}>
					<Route exact path="/" component={Home}/>
					<Route path="/error" component={ErrorPage}/>
					<Auth auth0Config={AUTH_CONFIG}>
						<Route path="/hdocs" component={HdocViewer}></Route>
					</Auth>
				</Root>
			</Router>
		</Provider>);
	}
}

export default App;
