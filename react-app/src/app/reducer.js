import { combineReducers } from "redux";

import { auth0Reducers } from "../auth0"

const app = (state = {}, action) => state;

export const rootReducer = combineReducers({ app, auth0: auth0Reducers })
