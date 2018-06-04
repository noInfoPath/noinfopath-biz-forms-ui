/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/* MaterialUI Components*/
import FlatButton from "material-ui/FlatButton";

/* Auth0 */
import { authorize } from "../../../auth0/actions";


const mapStateToProps = (state) => {

	return {
		auth0Config: state.auth0.auth0Config
	}
};


class Login extends Component {
	handleClick = () => {

		this.props.authorize(this.props.auth0Config, this.props.location.pathname);
	}

	render() {

		return (
			<FlatButton label="Login" onClick={this.handleClick}/>
		);
	}
}

const LoginButton = withRouter(connect(
	mapStateToProps, { authorize }
)(Login));

export default LoginButton;
