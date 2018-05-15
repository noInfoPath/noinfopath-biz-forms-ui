import {
	FETCH_LIBRARY,
	FETCH_LIBRARY_SUCCESS,
	FETCH_LIBRARY_ERROR,
	fetchLibrarySuccess,
	fetchLibraryError
} from "../actions/library-directory";
import { Observable } from "rxjs";

const libraryDirectory = function (state = [], action) {
	switch (action.type) {
	case FETCH_LIBRARY_SUCCESS:
		return action.libraryDirectory;
	case FETCH_LIBRARY_ERROR:
		return action.err;
	default:
		return state;
	}
}

export default libraryDirectory;
