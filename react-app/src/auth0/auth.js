import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { auth0Init, authorize, auth0Callback, auth0Logout } from "./actions";
import queryString from "query-string";

class AuthContainer extends Component {
	authenticatedRoute() {
		var children = this.props.children instanceof Array ? this.props.children : [this.props.children],
			matches = children.find(child => {
				return child.props.path === this.props.location.pathname;
			});

		return !!matches;
	}

	render() {
		if (this.props.authError && this.props.location.pathname !== this.props.auth0Config.errorPath) {
			return (<Redirect to={{pathname: this.props.auth0Config.errorPath, errorMessage: this.props.errorMessage}}/>);
		} else if (this.props.returnPath && /access_token|id_token|error/.test(this.props.location.hash) && this.props.loggedIn) {
			return (<Redirect to={ this.props.returnPath }/>)
		} else {
			if ((this.authenticatedRoute() && this.props.loggedIn) || !this.authenticatedRoute()) {
				return (<div> { this.props.children } </div>);
			} else {
				return null;
			}
		}


	}

	componentDidMount() {
		const isCallback = /access_token|id_token|error/.test(this.props.location.hash) && !this.props.loggedIn,
			parsed = queryString.parse(this.props.location.search),
			returnPath = this.props.location.pathname === "/error" ? "/" : parsed.returnPath || this.props.location.pathname;



		this.props.auth0Init(this.props.auth0Config);

		if (isCallback) {
			this.props.auth0Callback(this.props.auth0Config, returnPath);
		} else if (this.authenticatedRoute()) {
			if (!this.props.loggedIn && !this.props.inProgress) {
				this.props.authorize(this.props.auth0Config, returnPath);
			}
		}
	}

	componentDidUpdate() {
		if (this.authenticatedRoute() && !this.props.loggedIn && !this.props.inProgress) {
			this.props.authorize(this.props.auth0Config, this.props.location.pathname === "/error" ? "/" : this.props.location.pathname);
		}

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
	const newProps = {
		loggedIn: state.auth0.loggedIn,
		inProgress: state.auth0.inProgress,
		//auth0Config: state.auth0.Auth0Config,
		session: state.auth0.session,
		authError: !!state.auth0.error,
		errorMessage: state.auth0.error,
		returnPath: state.auth0.returnPath
	};

	return newProps;

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
