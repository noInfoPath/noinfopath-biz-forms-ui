import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {rootReducer} from "./root";
import configureStore from "./configure-store";
import App from './App';

const store = configureStore();
// const store = createStore(rootReducer, {
// 	documentLibrary: {
// 		documentTemplates: {
// 			templates: [],
// 			selectedTemplate: null
// 		}
// 	}
// }, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}>
	<MuiThemeProvider><App/></MuiThemeProvider>
</Provider>, document.getElementById('root'));

registerServiceWorker();
