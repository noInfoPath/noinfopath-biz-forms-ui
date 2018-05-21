/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory, withRouter } from "react-router";


/* MaterialUI Components*/
import MuiAppBar from 'material-ui/AppBar';
import FlatButton from "material-ui/FlatButton";

/*DemoAppBar Components & Assets*/
import LoginButton from "./components/login";
import Logged from "./components/logged";
import { LoginReducer, userLoginEpic } from "./components/login";


export { LoginReducer, userLoginEpic };

class Logo extends Component {
	handleClick = () => browserHistory.push("/");
	render() {
		return (<FlatButton onClick={this.handleClick}><img className="App-logo" src={this.props.src} alt="foo"/></FlatButton>);
	}
}

class DemoAppBar extends Component {
	render() {
			console.log(this);
			return (<MuiAppBar
			className="demo-app-bar"
			title="Editable Form Demo"
			iconElementLeft={<Logo src={this.props.logo}></Logo>}
			iconElementRight={ this.props.logged ? <Logged></Logged> : <LoginButton></LoginButton> }
		/>)
	}
}


const mapStateToProps = (state) => {
	console.log("AppBar::mapStateToProps", state);
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

const AppBar = connect(
	mapStateToProps,
	mapDispatchToProps
)(DemoAppBar);

export default withRouter(AppBar);
