/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

/* MaterialUI Components*/
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";


class LoggedComponent extends Component {
	render() {
		return (<IconMenu
			{...this.props}
			iconButtonElement={
				<IconButton><MoreVertIcon /></IconButton>
			}
			targetOrigin={{horizontal: "right", vertical: "top"}}
			anchorOrigin={{horizontal: "right", vertical: "top"}}
		>
			<MenuItem primaryText="Refresh" />
			<MenuItem primaryText="Help" />
			<MenuItem primaryText="Sign out" />
		</IconMenu>)
	}
}

const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

const Logged = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoggedComponent);

export default withRouter(Logged);
