/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'

/* Demo Components*/
import AppBar from './components/app-bar';



/*App Components & Assets*/
import logo from "./images/nip-logo.svg";
import "./App.css";

class AppComponent extends Component {
	componentDidMount() {
		console.log("App::componentDidMount", this);
	}

	render() {
		return (<div className="App">
			<AppBar logo={logo}/>
			<div>{this.props.children}</div>
		</div>);
	}
}

const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

const App = connect(
	mapStateToProps,
	mapDispatchToProps
)(AppComponent);

export default withRouter(App);
