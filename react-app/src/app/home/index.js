import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import logo from "../../images/nip-logo.svg";

class HomeComponent extends Component {
	componentDidMount() {
		console.log("[HomeComponent::componentDidMount]", this.props);

	}

	// handleClick() {
	// 	console.log("Get Started");
	// }
	//
	render() {
		return (<div className="home">
				<h1>Content Editable Forms Demo</h1>
				<div><img src={logo} alt="NoInfoPath" /></div>
				<Link to="/hdocs"><RaisedButton label="Get Started Now"></RaisedButton></Link>
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
