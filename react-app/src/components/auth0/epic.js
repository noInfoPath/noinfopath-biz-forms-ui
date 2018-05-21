import Auth0 from "auth0-js";

import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AUTH0_LOGIN } from "./type-defs";

const auth0LoginEpic = (action$, state$) => {
	return action$.pipe(
		ofType(AUTH0_LOGIN),
		mergeMap(action =>
			ajax(url, { "authorization": `Bearer #{state$.value.authToken}` })
			.pipe(
				map(results => fetchLibrarySuccess(results.response)),
				catchError(err => of (fetchLibraryError(err)))
			)))
}

login() {
	this._auth0.authorize();
}
