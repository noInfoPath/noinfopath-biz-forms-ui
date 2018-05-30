/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";

/* MaterialUI Components*/
import FlatButton from "material-ui/FlatButton";

/* Auth0 */


const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({
	onLoginClicked: () => {
		/*
		 * FIXME:  There is no actual login page because Auto0 Lock is used.
		 */
		dispatch({ type: "FOO" });
	}
});

class Login extends Component {
	handleClick = () => {
		this.props.onLoginClicked();
	}

	render() {
		console.log("[Login:render]", this.props);
		return (
			<FlatButton label="Login" onClick={this.handleClick}/>
		);
	}
}

const LoginButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginButton;
