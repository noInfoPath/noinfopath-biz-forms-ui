/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/* MaterialUI Components*/
import MenuItem from "material-ui/MenuItem";

import { auth0Logout } from "../../../auth0"

class LoggedComponent extends Component {
	handleSignOutClick = () => {
		this.props.auth0Logout();
	}

	render() {
		return (<MenuItem primaryText="Sign out" onClick={this.handleSignOutClick}/>)
	}
}


const Logged = connect(
	null, { auth0Logout }
)(LoggedComponent);

export default withRouter(Logged);
