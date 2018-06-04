import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { connect } from "react-redux";

export const ERRORPAGE_SHOWN = "ERRORPAGE_SHOWN";

export function errorPageShown() {
	return {
		type: ERRORPAGE_SHOWN
	};
}

class ErrorPage extends Component {

	componentDidMount() {
		console.log("[ErrorPage::componentDidMount]", this);

		errorPageShown();
	}

	render() {
		const style = {
			position: "absolute",
			display: "flex",
			justifyContent: "top",
			alignItems: "center",
			flexDirection: "column",
			height: "100vh",
			width: "100vw",
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: "white",
		}

		console.log("[ErrorPage:render]", this.props);

		return (<div style = { style }>
			<h1>Unhandled Error</h1>
			<div>{this.props.location.errorMessage}</div>
			</div>);
	}
}


const mapStateToProps = (state) => {
	return {}
}


export default withRouter(connect(mapStateToProps, {})(ErrorPage));
