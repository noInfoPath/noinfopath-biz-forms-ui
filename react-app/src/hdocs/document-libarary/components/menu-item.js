import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { ListItem } from 'material-ui/List';

const mapStateToProps = (state) => {
	return Object.assign({}, state);
};

const mapDispatchToProps = dispatch => ({});

class MenuItemComponent extends Component {
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

const MenuItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItemComponent);

export default withRouter(MenuItem);
