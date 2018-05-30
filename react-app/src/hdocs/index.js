import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import DocumentLibrary from "./document-libarary";

class HdocsViewerComponent extends Component {


	render() {
		console.log("[HdocsViewerComponent] ", this.props);
		// if (this.auth.isAuthenticated()) {
		// 	return (<div> <DocumentLibrary auth={this.auth}/> </div>)
		// } else {
		return (<div>HDOCS</div>)
		// }
	};
}



const HdocsViewer = connect(
	null, {}
)(HdocsViewerComponent);

export default withRouter(HdocsViewer);
