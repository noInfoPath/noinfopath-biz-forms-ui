import React, { Component } from "react";
import PropTypes from "prop-types";
import LibraryMenuItem from "../containers/library-menu-item";
import { List, ListItem } from "material-ui/List";
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';

class Menu extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchLibrary();
	}

	render() {
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

	}
}

export default Menu;
