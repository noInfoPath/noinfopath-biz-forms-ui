import {
	FETCH_LIBRARY,
	FETCH_LIBRARY_SUCCESS,
	FETCH_LIBRARY_ERROR
} from "../type-defs";

export function fetchLibrary(libraryFilter) {
	return {
		type: FETCH_LIBRARY,
		libraryFilter
	}
}

export function fetchLibrarySuccess(libraryDirectory) {
	return {
		type: FETCH_LIBRARY_SUCCESS,
		libraryDirectory
	}
}

export function fetchLibraryError(err) {
	return {
		type: FETCH_LIBRARY_ERROR,
		libraryDirectoryError: err.response
	}
}
