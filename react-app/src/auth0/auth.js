import React, { Component } from "react";
import { withRouter, BrowserRouter } from "react-router-dom";
import { connect } from 'react-redux'
import Auth0 from "auth0-js";
// import { lstore } from "../../utils"
import { auth0Init, authorize, auth0Callback, auth0Logout, authRequireAuthorization } from "./actions";
import queryString from "query-string";

import Waiting from "./waiting";

class AuthContainer extends Component {

	render() {
		switch (this.props.location.pathname) {
		case "/":
			return (<div> { this.props.children } </div>);
			break;
		default:
			if (this.props.loggedIn === undefined) {

				return (<Waiting/>);
			} else if (!this.props.error) {
				return (<div>{ this.props.error }</div>)
			} else {
				if ((this.authenticatedRoute() && this.props.loggedIn) || !this.authenticatedRoute()) {
					return (<div> { this.props.children } </div>);
				} else if (!this.props.inProgress) {
					const session = this.getSession();

					return (<Waiting/>);
				} else {
					return (<Waiting/>);
				}
			}
			break;
		}

	}

	componentDidMount() {
		console.log("[AuthContainer::componentDidMount]", this);
		const isCallback = /access_token|id_token|error/.test(this.props.location.hash),
			qs = queryString.parse(this.props.location.search);

		if (isCallback) {
			this.props.auth0Callback(this.props.auth0Config);
			//this.props.history.push(qs.returnPath || "/");
		} else if (this.authenticatedRoute()) {
			if (!this.props.loggedIn && !this.props.inProgress) {
				this.props.authorize(this.props.auth0Config, this.props.location.pathname);
			}
		} else {
			this.props.auth0Init(this.props.auth0Config);
		}
	}

	componentDidUpdate() {
		console.log(this.props.error);
		if (this.authenticatedRoute() && !this.props.loggedIn && !this.props.inProgress & !this.props.error) {
			console.log("[AuthContainer::componentDidUpdate]", this.authenticatedRoute(), !this.props.loggedIn, !this.props.inProgress);

			this.props.authorize(this.props.auth0Config, this.props.location.pathname);
		}

	}

	authenticatedRoute() {
		var children = this.props.children instanceof Array ? this.props.children : [this.props.children],
			matches = children.find(child => {
				return child.props.path === this.props.location.pathname;
			});

		return !!matches;
	}

	getSession() {
		return JSON.parse(localStorage.getItem("auth")) || {
			accessToken: "",
			idToken: "",
			expires: 0
		}

	}

	// accessToken() {
	// 	return localStorage.getItem("access_token");
	// }

	// renewToken() {
	// 	this.auth0.checkSession({},
	// 		(err, result) => {
	// 			if (err) {
	// 				console.error(err);
	// 				this.logout();
	// 			} else {
	// 				console.log("XXXXXXXX-ZZZZZZZZ");
	// 				this.setSession(result);
	// 			}
	// 		}
	// 	);
	// }

	// scheduleRenewal() {
	// 	const expiresAt = this.getSession()
	// 		.expires;
	// 	const delay = expiresAt - Date.now();
	// 	if (delay > 0) {
	// 		this.tokenRenewalTimeout = setTimeout(() => {
	// 			this.renewToken();
	// 		}, delay);
	// 	}
	// }
}

const mapStateToProps = (state) => {
	return {
		loggedIn: state.auth0.loggedIn,
		inProgress: state.auth0.inProgress,
		// auth0Config: state.auth0.Auth0Config,
		session: state.auth0.session,
		error: state.auth0.err ? state.auth0.err.errorDescription : null
	};
}

// const mapDispatchToProps = dispatch => ({
// 	requireAuthorization: () => dispatch(auth0RequireAuthorization()),
// 	authorize: () => {
//
//
// 		dispatch(auth0Authorize(!!localStorage.getItem("access_token") && !expired))
// 	},
// 	logout: () => {
// 		localStorage.removeItem("access_token");
// 		localStorage.removeItem("id_token");
// 		localStorage.removeItem("expires_at");
// 		dispatch(auth0Logout())
// 	}
// });

export default withRouter(connect(mapStateToProps, { auth0Init, auth0Callback, authorize, auth0Logout })(AuthContainer));
