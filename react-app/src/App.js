import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import DocumentLibrary from "./components/document-libarary";
import logo from "./images/nip-logo.svg";
import "./App.css";

class App extends Component {
	componentDidMount() {
		console.log("App::componentDidMount", this);
	}

	render() {
		return (<div className="App">
			<AppBar title="Editable Form Demo" iconClassNameRight="muidocs-icon-navigation-expand-more">
				<img className="App-logo" src={logo} alt="foo"/>
			</AppBar>
			<DocumentLibrary/></div>);
	}
}

export default App;
