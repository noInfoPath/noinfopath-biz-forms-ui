import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import configureStore from "./configure-store";
import { syncHistoryWithStore } from 'react-router-redux'
import Auth from "./lib/auth";
import { AUTH_CONFIG, HDOCS_CONFIG } from "./app-config";
import App from './App';
import HdocViewer from './hdocs'
import Home from './areas/home'
import Callback from './areas/callback'

const store = configureStore();
// console.log(store);
//store.setState();


const history = syncHistoryWithStore(browserHistory, store)

const auth = new Auth(AUTH_CONFIG);

ReactDOM.render(<Provider store={store}>
	<MuiThemeProvider>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="login"></Route>
				<Route path="logout"></Route>
				<Route path="hdocs" component={HdocViewer} auth={auth}></Route>
				<Route path="callback" component={Callback} auth={auth}></Route>
			</Route>
		</Router>
	</MuiThemeProvider>
</Provider>, document.getElementById('root'));

registerServiceWorker();
