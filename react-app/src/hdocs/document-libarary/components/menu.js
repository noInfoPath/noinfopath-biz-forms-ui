import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import LibraryMenuItem from "../containers/library-menu-item";
import { List, ListItem } from "material-ui/List";
import CircularProgress from 'material-ui/CircularProgress';

class MenuComponent extends Component {

	componentDidMount() {
		this.props.fetchLibrary();
	}

	render() {

		if (this.props.libraryDirectory) {
			return (
				<List>
				{Object
					.keys(this.props.libraryDirectory)
					.map(key => {
						const group = this
							.props
							.libraryDirectory[key];

						return (<ListItem
							key={key}
							primaryText={key}
							primaryTogglesNestedList={true}
							nestedItems={group.map(item => <LibraryMenuItem key={item.id} {...item}/>)} />)
					})}
			</List>
			)
		} else {
			return (<div ><CircularProgress/></div>)
		}
	}
}
const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

const Menu = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuComponent);

export default withRouter(Menu);
