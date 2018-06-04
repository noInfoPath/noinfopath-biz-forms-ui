export const AUTH0_INIT = "AUTH0_INIT";
export const AUTH0_AUTHORIZE = "AUTH0_AUTHORIZE";
export const AUTH0_CALLBACK = "AUTH0_CALLBACK";
export const AUTH0_ERROR = "AUTH0_ERROR";
export const AUTH0_LOGOUT = "AUTH0_LOGOUT";

export const AUTH0_AUTHENTICATED = "AUTH0_AUTHENTICATED"; //DELETE
export const AUTH0_LOGIN = "AUTH0_LOGIN"; //DELETE
export const AUTH0_NOOP = "AUTH0_NOOP";

function checkAuthenticationStatus(accessToken, expires) {
	const now = new Date(),
		expired = now.getTime() >= expires,
		isAuthenticated = !!accessToken && !expired;

	return isAuthenticated;
}


function getSession() {
	return JSON.parse(localStorage.getItem("auth") || "{}");
}

function deleteSession() {
	localStorage.removeItem("auth");
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

export function auth0Init(auth0Config) {
	const session = getSession();

	return {
		type: AUTH0_INIT,
		loggedIn: !!session.accessToken,
		inProgress: false,
		auth0Config,
		session
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
	deleteSession();

	return {
		type: AUTH0_LOGOUT,
		loggedIn: false,
		inProgress: false
	}
}

export function auth0Authenticated(authResult, returnPath) {
	setSession(authResult);

	return {
		type: AUTH0_AUTHENTICATED,
		loggedIn: true,
		inProgress: false,
		returnPath: returnPath
	}
}

export function authLogin() {
	return {
		type: AUTH0_LOGIN,
		loggedIn: false,
		inProgress: true
	}
}


export function auth0Callback(auth0Config, returnPath) {
	const action = {
		type: AUTH0_CALLBACK,
		auth0Config,
		returnPath,
		loggedIn: false,
		inProgress: false
	};

	console.log(action);
	return action;
}

export function auth0Error(err) {
	return {
		type: AUTH0_ERROR,
		error: err,
		loggedIn: false,
		inProgress: false,
		session: {}
	}
}



export function authNoop() {
	return {
		type: AUTH0_NOOP
	}
}
