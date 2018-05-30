import Auth0 from "auth0-js";

import { ofType } from "redux-observable";
import {
	EMPTY,
	iif,
	of
} from "rxjs";
import {
	tap,
	pipe,
	mapTo,
	mergeMap,
	defer,

	map
} from 'rxjs/operators';


import {
	auth0Init,
	auth0Login,
	auth0LoginError,
	auth0Authenticated,
	AUTH0_LOGIN,
	AUTH0_LOGOUT,
	AUTH0_AUTHENTICATED,
	AUTH0_AUTHORIZE,
	AUTH0_CALLBACK,
	authNoop
} from "./actions";

const auth0AuthenticateEpic = (action$, state$) => {

	return action$.pipe(
		ofType(AUTH0_AUTHORIZE),
		map(() => {
			const state = state$.getState(),
				auth0Config = state.auth0.auth0Config,
				redirectUrl = auth0Config.callbackUrl + (state.auth0.redirectUri ? "?returnPath=" + state.auth0.redirectUri : "");

			console.log("[auth0AuthenticateEpic]", state, redirectUrl);


			if (!state.auth0.loggedIn) {
				const auth0 = new Auth0.WebAuth({
					domain: auth0Config.domain,
					clientID: auth0Config.clientId,
					redirectUri: redirectUrl,
					audience: auth0Config.audience,
					responseType: auth0Config.responseType,
					scope: auth0Config.scope
				});

				setTimeout(auth0.authorize(), 0);
			}

			return authNoop();

		}));
}

const auth0LogoutEpic = (action$, state$) => {
	return action$.pipe(
		ofType(AUTH0_LOGOUT),
		map(() => {


			var state = state$.getState();

			const auth0Config = state.auth0.auth0Config,
				auth0 = new Auth0.WebAuth({
					domain: auth0Config.domain,
					clientID: auth0Config.clientId,
					redirectUri: auth0Config.callbackUrl,
					audience: auth0Config.audience,
					responseType: auth0Config.responseType,
					scope: auth0Config.scope
				});

			localStorage.removeItem("auth");

			auth0.logout();

			return authNoop();
		}));
}

export { auth0AuthenticateEpic, auth0LogoutEpic };
