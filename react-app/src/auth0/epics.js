import Auth0 from "auth0-js";

import { ofType } from "redux-observable";

// import {} from "rxjs";

import { switchMap, map } from "rxjs/operators";


import {
	auth0Error,
	auth0Authenticated,
	AUTH0_LOGOUT,
	AUTH0_AUTHORIZE,
	AUTH0_CALLBACK,
	authNoop
} from "./actions";

import { BrowserRouter } from "react-router-dom";


// function processAuthResult() {
// 	const action = {
// 			type: AUTH0_CALLBACK,
// 			loggedIn: false,
// 			inProgress: false
// 		},
// 		auth0 = new Auth0.WebAuth({
// 			domain: auth0Config.domain,
// 			clientID: auth0Config.clientId,
// 			redirectUri: auth0Config.callbackUrl, //+ (state.redirectUri ? "?returnPath=" + state.auth0.redirectUri : ""),
// 			audience: auth0Config.audience,
// 			responseType: auth0Config.responseType,
// 			scope: auth0Config.scope
// 		});
//
// 	//BUG: May need to manage state token manually
//
// 	return
// 	auth0.parseHash((err, authResult) => {
//
// 		action.loggedIn = !!authResult;
//
// 		if (authResult && authResult.accessToken && authResult.idToken) {
// 			console.log("AUTHORIZED!!!!");
// 			setSession(authResult);
// 			action.authResult = authResult;
// 			action.loggedIn = true;
// 			action.inProgress = false;
// 		} else if (err) {
// 			console.error("NOT AUTHORIZED", err.errorDescription);
// 			action.loggedIn = false;
// 			action.inProgress = false;
// 			action.err = err;
// 		}
// 	});
// }

const auth0AuthenticateEpic = (action$, state$) => {

	return action$.pipe(
		ofType(AUTH0_AUTHORIZE),
		map(({ redirectUri, auth0Config, loggedIn }) => {
			const redirectUrl = auth0Config.callbackUrl + (redirectUri ? "?returnPath=" + redirectUri : "");

			if (!loggedIn) {
				const auth0 = new Auth0.WebAuth({
					domain: auth0Config.domain,
					clientID: auth0Config.clientId,
					redirectUri: redirectUrl,
					audience: auth0Config.audience,
					responseType: auth0Config.responseType,
					scope: auth0Config.scope
				});

				auth0.authorize();
			}

			return authNoop();

		}));
}

const auth0CallbackEpic = (action$, state$) => {

	function promiseToParseHash(auth0Config) {
		const auth0 = new Auth0.WebAuth({
			domain: auth0Config.domain,
			clientID: auth0Config.clientId,
			redirectUri: auth0Config.callbackUrl, //+ (redirectUri ? "?returnPath=" + auth0.redirectUri : ""),
			audience: auth0Config.audience,
			responseType: auth0Config.responseType,
			scope: auth0Config.scope
		});

		return new Promise((resolve, reject) => {
			auth0.parseHash((err, authResult) => {
				if (err) {
					reject(err);
				} else {
					resolve(authResult);
				}
			});
		})
	}

	return action$.pipe(
		ofType(AUTH0_CALLBACK),
		switchMap(({ auth0Config, returnPath }) => promiseToParseHash(auth0Config)
			.then(authResult => auth0Authenticated(authResult, returnPath))
			.catch(err => auth0Error(err))
		));
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

			auth0.logout();

			return authNoop();
		}));
}

export { auth0AuthenticateEpic, auth0LogoutEpic, auth0CallbackEpic };
