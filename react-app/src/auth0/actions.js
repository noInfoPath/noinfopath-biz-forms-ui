import Auth0 from "auth0-js";

export const AUTH0_INIT = "AUTH0_INIT"; //DELETE
export const AUTH0_LOGIN = "AUTH0_LOGIN"; //DELETE
export const AUTH0_CALLBACK = "AUTH0_CALLBACK";
export const AUTH0_LOGIN_ERROR = "AUTH0_LOGIN_ERROR";
export const AUTH0_AUTHENTICATED = "AUTH0_AUTHENTICATED";
export const AUTH0_AUTHORIZE = "AUTH0_AUTHORIZE";
export const AUTH0_LOGOUT = "AUTH0_LOGOUT";
export const AUTH0_NOOP = "AUTH0_NOOP";

function checkAuthenticationStatus(accessToken, expires) {
	const now = new Date(),
		expired = now.getTime() >= expires,
		isAuthenticated = !!accessToken && !expired;

	return isAuthenticated;
}

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

function getSession() {
	return JSON.parse(localStorage.getItem("auth") || "{}");
}

export function auth0Init(auth0Config) {
	return {
		type: AUTH0_INIT,
		loggedIn: false,
		inProgress: false,
		auth0Config
	}
}

/**
 * Checks the provided `isAuthenticated`, when true will return an actions with
 * the `loggedIn` and `inProgress` to true and false respectively.
 *
 * Because the behavior is to redirect to an off-site link (auth0.com) we really
 * would never return the action. But, we'll do the redirect in a callback to
 * setTimeout, and return the action with `loggedIn` and `inProgress` to false
 * and true respectively.
 *
 * QUESTION: How to persist state?  localStorage or sessionStorage? Check for
 * 			 npm package that already handles this.
 *
 */
export function authorize(auth0Config, redirectUri) {
	const sessionData = getSession(),
		isAuthenticated = checkAuthenticationStatus(sessionData.accessToken, sessionData.expires),
		action = {
			type: AUTH0_AUTHORIZE,
			auth0Config,
			loggedIn: isAuthenticated,
			inProgress: !isAuthenticated,
			session: sessionData,
			redirectUri
		};

	return action;
}

export function auth0Logout() {
	return {
		type: AUTH0_LOGOUT,
		loggedIn: false,
		inProgress: false
	}
}

export function authAuthenticated() {
	return {
		type: AUTH0_AUTHENTICATED,
		loggedIn: true,
		inProgress: false
	}
}

export function authLogin() {
	return {
		type: AUTH0_LOGIN,
		loggedIn: false,
		inProgress: true
	}
}


export function auth0Callback(auth0Config) {
	const action = {
			type: AUTH0_CALLBACK,
			loggedIn: false,
			inProgress: false
		},
		auth0 = new Auth0.WebAuth({
			domain: auth0Config.domain,
			clientID: auth0Config.clientId,
			redirectUri: auth0Config.callbackUrl, //+ (state.redirectUri ? "?returnPath=" + state.auth0.redirectUri : ""),
			audience: auth0Config.audience,
			responseType: auth0Config.responseType,
			scope: auth0Config.scope
		});

	//BUG: May need to manage state token manually

	auth0.parseHash((err, authResult) => {

		action.loggedIn = !!authResult;

		if (authResult && authResult.accessToken && authResult.idToken) {
			setSession(authResult);
			action.authResult = authResult;
			action.loggedIn = true;
			action.inProgress = false;
		} else if (err) {
			// console.error(err.errorDescription);
			action.loggedIn = false;
			action.inProgress = false;
			action.err = err;
		}
	});

	return action;
}

export function authLoginError(err) {
	return {
		type: AUTH0_LOGIN_ERROR,
		err,
		loggedIn: false,
		inProgress: false
	}
}



export function authNoop() {
	return {
		type: AUTH0_NOOP
	}
}
