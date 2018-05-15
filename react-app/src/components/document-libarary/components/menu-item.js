import React, { Component } from "react";
import PropTypes from "prop-types";
import { ListItem } from 'material-ui/List';

class MenuItem extends Component {
	handleClick = () => {
		this.props.onMenuItemClicked(this.props.id);
	}
	render() {
		const menuProps = this.props;

		return (<ListItem
			key={menuProps.id}
			primaryText={menuProps.title}
			onClick={this.handleClick}
		/>)
	}
}

export default MenuItem;
