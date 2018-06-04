/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom"

/* Demo Components*/
import AppBar from "../app-bar";


class RootComponent extends Component {

	render() {
		const style = {
			position: "relative"
		}

		return (
			<div>
				<AppBar logo={this.props.logo}/>
				<div style={style}>{this.props.children}</div> </div>
		);
	}
}


const Root = connect(
	null, {}
)(RootComponent);

export default withRouter(Root);
