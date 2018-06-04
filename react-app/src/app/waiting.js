import React, { Component } from "react";
import { connect } from "react-redux";
import loading from "../images/loading.svg";

class Waiting extends Component {

	componentDidMount() {
		console.log("[WaitingComponent::componentDidMount]", this, arguments);
	}

	render() {
		const style = {
			position: "absolute",
			display: "flex",
			justifyContent: "center",
			height: "100vh",
			width: "100vw",
			top: 0,
			bottom: 0,
			left: 0,
			right: 0,
			backgroundColor: "white",
		}

		return (<div style = { style }>
			<img src={ loading } alt="waiting..." />
			</div>);
	}
}

export default Waiting;
