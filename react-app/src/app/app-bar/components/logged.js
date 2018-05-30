/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/* MaterialUI Components*/
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";

import { auth0Logout } from "../../../auth0"

class LoggedComponent extends Component {
	handleSignOutClick = () => {
		this.props.auth0Logout();
	}

	render() {
		return (<IconMenu
			
			iconButtonElement={
				<IconButton><MoreVertIcon /></IconButton>
			}
			targetOrigin={{horizontal: "right", vertical: "top"}}
			anchorOrigin={{horizontal: "right", vertical: "top"}}
		>
			<MenuItem primaryText="Refresh" />
			<MenuItem primaryText="Help" />
			<MenuItem primaryText="Sign out" onClick={this.handleSignOutClick}/>
		</IconMenu>)
	}
}


const Logged = connect(
	null, { auth0Logout }
)(LoggedComponent);

export default withRouter(Logged);
