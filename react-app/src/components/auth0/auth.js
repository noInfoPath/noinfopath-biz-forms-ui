import Auth0 from "auth0-js";

export default class Auth {

	constructor(AUTH_CONFIG) {
		console.log(AUTH_CONFIG);
		this._auth0 = new Auth0.WebAuth({
			domain: AUTH_CONFIG.domain,
			clientID: AUTH_CONFIG.clientId,
			redirectUri: AUTH_CONFIG.callbackUrl,
			audience: `https://restapi.sop.heavensentlegal.com`,
			responseType: "token id_token",
			scope: "openid"
		});
	}

	login() {
		this._auth0.authorize();
	}

	handleAuthentication() {
		return this._auth0.parseHash((err, authResult) => {
			if (authResult && authResult.accessToken && authResult.idToken) {
				this.setSession(authResult);
				return authResult;
			} else if (err) {
				console.trace(err);
				throw err;
			}
		});
	}

	setSession(authResult) {
		// Set the time that the access token will expire at
		let expiresAt = JSON.stringify(
			authResult.expiresIn * 1000 + new Date()
			.getTime()
		);

		localStorage.setItem('access_token', authResult.accessToken);
		localStorage.setItem('id_token', authResult.idToken);
		localStorage.setItem('expires_at', expiresAt);

		// schedule a token renewal
		this.scheduleRenewal();

	}


	logout() {
		// Clear access token and ID token from local storage
		localStorage.removeItem("access_token");
		localStorage.removeItem("id_token");
		localStorage.removeItem("expires_at");
		// navigate to the home route
		//history.replace("/home");
	}

	get isAuthenticated() {
		// Check whether the current time is past the
		// access token"s expiry time
		let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		return new Date()
			.getTime() < expiresAt;
	}


	get accessToken() {
		return localStorage.getItem("access_token");
	}

	renewToken() {
		this.auth0.checkSession({},
			(err, result) => {
				if (err) {
					console.error(err);
					this.logout();
				} else {
					this.setSession(result);
				}
			}
		);
	}

	scheduleRenewal() {
		const expiresAt = JSON.parse(localStorage.getItem("expires_at"));
		const delay = expiresAt - Date.now();
		if (delay > 0) {
			this.tokenRenewalTimeout = setTimeout(() => {
				this.renewToken();
			}, delay);
		}
	}
}
