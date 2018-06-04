import { combineReducers } from "redux";
import { auth0Reducers, AUTH0_ERROR } from "../auth0";

const app = (state = {}, action) => {
	switch (action.type) {

		default: return state;
	}
};

export const rootReducer = combineReducers({ app, auth0: auth0Reducers })
