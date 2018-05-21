import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import DocumentLibrary from "./document-libarary";

class HdocsViewerComponent extends Component {

	constructor() {
		super();

		console.log("[HdocsViewerComponent:constructor]", arguments);

	}
	componentWillMount() {
		console.log("HdocsViewer::componentWillMount", this);
		this.auth = this.props.route.auth;


		if (!this.auth.isAuthenticated) {
			this.auth.login();
		}
	}


	render() {

		if (this.auth.isAuthenticated) {
			return (<div> <DocumentLibrary auth={this.auth}/> </div>)
		} else {
			return (<div></div>)
		}
	};
}

const mapStateToProps = (state, ownProps) => {
	console.log("[HdocsViewer::mapStateToProps]", state, ownProps);
	return Object.assign({}, state, { isAuthenticated: ownProps.route.auth.accessToken, accessToken: ownProps.route.auth.accessToken });
};


const mapDispatchToProps = dispatch => ({});

const HdocsViewer = connect(
	mapStateToProps,
	mapDispatchToProps
)(HdocsViewerComponent);

export default withRouter(HdocsViewer);
