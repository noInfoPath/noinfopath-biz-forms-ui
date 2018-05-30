/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom"

/* MaterialUI Components*/
import MuiAppBar from 'material-ui/AppBar';
import FlatButton from "material-ui/FlatButton";

/*DemoAppBar Components & Assets*/
import LoginButton from "./components/login";
import Logged from "./components/logged";
import { LoginReducer, userLoginEpic } from "./components/login";


export { LoginReducer, userLoginEpic };

class DemoAppBar extends Component {
	render() {
			return (<MuiAppBar
			className="demo-app-bar"
			title="Editable Form Demo"
			iconElementLeft={<Link to="/"><FlatButton onClick={this.handleClick}><img className="App-logo" src={this.props.logo} alt="Editable For Demo"/></FlatButton></Link>}
			iconElementRight={ this.props.auth0.loggedIn ? <Logged></Logged> : <LoginButton></LoginButton> }
		/>)
	}
}


const mapStateToProps = (state) => {
	//console.log("AppBar::mapStateToProps", state.auth.login);
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

const AppBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(DemoAppBar);

export default AppBar;
