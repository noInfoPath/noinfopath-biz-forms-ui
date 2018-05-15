import React, { Component } from "react";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import LibraryMenu from "./containers/library-menu";
import Subheader from 'material-ui/Subheader';

class DocumentLibrary extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true
		};
	}

	componentDidMount() {
		console.log("DocumentLibrary::componentDidMount", this);
		// this
		// 	.props
		// 	.fetchLibrary();
	}

	render() {
		return (<Drawer containerClassName="doc-lib-drawer">
			<Subheader>Affidavits</Subheader>
			<LibraryMenu/>
		</Drawer>);
	}
}

export default DocumentLibrary;
