import React, { Component } from "react";
import { connect } from "react-redux";
import loading from "../images/loading.svg";

class CallbackComponent extends Component {

	componentDidMount() {
		console.log(this, arguments);

		const auth = this.props.route.auth;

		if (/access_token|id_token|error/.test(this.props.location.hash)) {
			try {
				auth.handleAuthentication();
			} catch (err) {
				console.error(err);
			}

		}
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

		return (
			<div style={style}>
				<img src={loading} alt="loading"/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {

	return Object.assign({}, state);

};

const mapDispatchToProps = dispatch => ({});

const Callback = connect(
	mapStateToProps,
	mapDispatchToProps
)(CallbackComponent);

export default Callback;
