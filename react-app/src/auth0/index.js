import { combineReducers } from "redux";

import { auth0AuthenticateEpic, auth0LogoutEpic } from "./epics";
import auth from "./auth"
import { auth0Init, auth0Login, auth0Logout, auth0LoginSuccess, auth0LoginError, auth0RequireAuthorization } from "./actions";
import auth0Reducers from "./reducers";

export {
	auth0Init,
	auth0Login,
	auth0Logout,
	auth0LoginSuccess,
	auth0LoginError,
	auth0RequireAuthorization,
	auth0Reducers,
	auth0AuthenticateEpic,
	auth0LogoutEpic
};

export default auth;
