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

function setSession(authResult) {
	// Set the time that the access token will expire at
	const authSession = {
		"accessToken": authResult.accessToken,
		"idToken": authResult.idToken,
		"expires": authResult.expiresIn * 1000 + (new Date())
			.getTime()

	};

	localStorage.setItem("auth", JSON.stringify(authSession));

	// schedule a token renewal
	//this.scheduleRenewal();

}

const appError = (action$, state$) => {

	return action$.pipe(
		ofType(AUTH0_ERROR),
		map(({ error }) => {
			console.error(error);
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
		switchMap(({ auth0Config }) => promiseToParseHash(auth0Config)
			.then(authResult => auth0Authenticated(authResult))
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
