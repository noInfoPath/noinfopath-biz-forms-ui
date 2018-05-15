import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as documentLibraryReducers from "./components/document-libarary/reducers";
import { fetchLibraryDirectoryEpic } from "./components/document-libarary/epics";


export const rootReducer = combineReducers(documentLibraryReducers);

export const rootEpic = combineEpics(
	fetchLibraryDirectoryEpic
);
