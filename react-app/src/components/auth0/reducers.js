import Auth0 from "auth0-js";

import { AUTH0_INIT } from "./type-defs";

const initialState = {}

function initAuth0Reducer(state = initialState, action) {
	switch (action.type) {
	case AUTH0_INIT:
		const newState = {};
		if (!state.auth0Config) {
			console.warn("Cannot initialize auth0 interface because auth0Config is missing from the current state.");
		} else {
			newState.auth0 = new Auth0.WebAuth({
				domain: AUTH_CONFIG.domain,
				clientID: AUTH_CONFIG.clientId,
				redirectUri: AUTH_CONFIG.callbackUrl,
				audience: AUTH_CONFIG.audience,
				responseType: AUTH_CONFIG.responseType,
				scope: AUTH_CONFIG.scope
			});
		}

		return Object.assign({}, state, newState);
	case AUTO0_LOGIN:
		//Nothing to really do here except trigger the "lock"
		if (!state.auth0) {
			console.warn("auth0 is not initialized. Cannot call authorize.");
		} else {
			//NOTE: this will cause an off site redirect.
			//		it will recover in the callback component.
			//		not sure if this should happen here or not.
			state.auth0.authorize();
		}
		return state;
	default:
		return state;
	}
}
