import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { mergeMap, map, catchError } from 'rxjs/operators';

import {
	FETCH_LIBRARY
} from "../type-defs";

import {
	fetchLibrarySuccess,
	fetchLibraryError
} from "../actions/library-directory";

const fetchLibraryDirectoryEpic = (action$, state$) => {
	const url = "/directory";
	console.log(state$);
	return action$.pipe(
		ofType(FETCH_LIBRARY),
		mergeMap(action =>
			ajax(url, { "authorization": `Bearer #{state$.value.authToken}` })
			.pipe(
				map(results => fetchLibrarySuccess(results.response)),
				catchError(err => of (fetchLibraryError(err)))
			)))
}


export default fetchLibraryDirectoryEpic;
