import Auth from "./auth"
import { AUTH0_INIT, AUTH0_LOGIN, AUTH0_LOGOUT, AUTH0_AUTHENTICATED, AUTH0_AUTHORIZE, AUTH0_CALLBACK } from "./actions";
import md5 from "md5";

const initialState = {
	loggedIn: false,
	inProgress: false,
	session: null,
	auth0Config: null
}

function initAuth0Reducer(state = initialState, action) {
	switch (action.type) {
	case AUTH0_INIT:
	case AUTH0_AUTHORIZE:
		console.log(action);
		var n = {
				auth0Config: action.auth0Config,
				loggedIn: action.loggedIn,
				inProgress: action.inProgress,
				session: action.session,
				redirectUri: action.redirectUri
			},
			a = md5(JSON.stringify(state)),
			b = md5(JSON.stringify(n));

		return a === b ? state : Object.assign({}, state, n);

	case AUTH0_CALLBACK:
		return Object.assign({}, state, { err: action.err, authResult: action.authResult, loggedIn: action.loggedIn, inProgress: action.inProgress });

	case AUTH0_LOGIN:
	case AUTH0_LOGOUT:
	case AUTH0_AUTHENTICATED:
		return Object.assign({}, state, { loggedIn: action.loggedIn, inProgress: action.inProgress });
	default:
		return state;
	}
}

export default initAuth0Reducer;
