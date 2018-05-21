/*React Components*/
import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "react-router-redux";

/* MaterialUI Components*/
import FlatButton from "material-ui/FlatButton";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";

export function userLogin() {
	return {
		type: USER_LOGIN
	}
}

export function userLoginSuccess() {
	return {
		type: USER_LOGIN_SUCCESS
	}
}

export function userLoginError() {
	return {
		type: USER_LOGIN_ERROR
	}
}

export function LoginReducer(state = {}, action) {
	switch (action.type) {
	case USER_LOGIN:
		return state;
	case USER_LOGIN_SUCCESS:
		return action.userInfo;
	case USER_LOGIN_ERROR:
		return action.err;
	default:
		return state;
	}
}

// export const userLoginEpic = action$ => action$.pipe(
// 	ofType(USER_LOGIN),
// 	debounceTime(250),
// 	tap()
// );


const mapStateToProps = (state) => {

	return Object.assign({}, state);

};

const mapDispatchToProps = dispatch => ({
	onLoginClicked: () => {
		dispatch(push("/login"));
	}
});

class Login extends Component {
	handleClick = () => {
		this.props.onLoginClicked();
	}

	render() {
		return (
			<FlatButton label="Login" onClick={this.handleClick}/>
		);
	}
}

const LoginButton = connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

export default LoginButton;
