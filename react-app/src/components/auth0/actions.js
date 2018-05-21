import {
	AUTH0_LOGIN,
	AUTH0_LOGIN_SUCCESS,
	AUTH0_LOGIN_ERROR
} from "./type-defs";

export function auth0Login() {
	return {
		type: AUTH0_LOGIN
	}
}

export function auth0LoginSuccess(authResult) {
	return {
		type: AUTH0_LOGIN_SUCCESS,
		authResult
	}
}

export function auth0LoginError(err) {
	return {
		type: AUTH0_LOGIN_ERROR,
		err
	}
}
