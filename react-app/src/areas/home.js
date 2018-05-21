import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import { browserHistory } from "react-router";
import RaisedButton from 'material-ui/RaisedButton';
import logo from "../images/nip-logo.svg";


class HomeComponent extends Component {
	componentDidMount() {
		console.log("HomeComponent::componentDidMount", this);
	}

	handleClick = event => browserHistory.push("/hdocs");

	render() {
		return (<div className="home">
				<h1>Content Editable Forms Demo</h1>
				<div><img src={logo} alt="NoInfoPath" /></div>
				<RaisedButton label="Get Started Now" onClick={this.handleClick}></RaisedButton>
		</div>);

	}
}

const mapStateToProps = (state, ownProps) => {

	return Object.assign({}, state);

};

const mapDispatchToProps = dispatch => ({});

const Home = connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeComponent);

export default withRouter(Home);
