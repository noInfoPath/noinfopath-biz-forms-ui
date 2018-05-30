/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"

/* Demo Components*/
import AppBar from "../app-bar";



class RootComponent extends Component {
	componentWillMount() {
		console.log("App::componentWillMount", this);
	}

	render() {
		return (
			<div>
				<AppBar logo={this.props.logo}/>
				<div>{this.props.children}</div>
			</div>
		);
	}
}


const Root = connect(
	null, {}
)(RootComponent);

export default withRouter(Root);
