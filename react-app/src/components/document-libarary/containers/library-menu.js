import { connect } from "react-redux";
import { fetchLibrary } from "../actions/library-directory";
import Menu from "../components/menu";


const mapStateToProps = (state) => {

	return Object.assign({}, state);

};

const mapDispatchToProps = dispatch => ({
	fetchLibrary: filter => dispatch(fetchLibrary(filter))
});

const LibraryMenu = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu);

export default LibraryMenu;
