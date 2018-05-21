import { connect } from "react-redux";
import { selectDocument } from "../actions/menu-item";
import MenuItem from "../components/menu-item";
import { withRouter } from 'react-router'


const mapStateToProps = (state) => {

	return Object.assign({}, state);

};

const mapDispatchToProps = dispatch => ({
	onMenuItemClicked: (documentId) => {
		dispatch(selectDocument(documentId))
	}
});

const LibraryMenuItem = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItem);

export default withRouter(LibraryMenuItem);
