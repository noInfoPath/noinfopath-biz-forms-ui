import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import * as documentLibraryReducers from "./hdocs/document-libarary/reducers";

import { fetchLibraryDirectoryEpic } from "./hdocs/document-libarary/epics";
import { routerReducer } from 'react-router-redux'


export const rootReducer = combineReducers({ documentLibraryReducers, routing: routerReducer });

export const rootEpic = combineEpics(
	fetchLibraryDirectoryEpic
);
