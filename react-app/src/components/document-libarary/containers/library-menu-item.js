import { connect } from "react-redux";
import { selectDocument } from "../actions/menu-item";
import MenuItem from "../components/menu-item";


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

export default LibraryMenuItem;
