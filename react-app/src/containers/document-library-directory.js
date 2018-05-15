import { connect } from "react-redux";
import { renderLibrary } from "../components/document-libarary/actions";
import Menu from "../components/document-libarary/components/menu";

const getDocumentLibraryDirectory = () => {
	return [{
			"group": "California",
			"title": "CH 200",
			"id": 27,
			"sop_document_template_type_id": 1
		},
		{
			"group": "California",
			"title": "Declaration of Diligence",
			"id": 46,
			"sop_document_template_type_id": 1
		},
		{
			"group": "California",
			"title": "DV 200",
			"id": 9,
			"sop_document_template_type_id": 1
		}
	]
};

const mapStateToProps = (state, ownProps) => {

	var docs = getDocumentLibraryDirectory();
	console.log(docs, state, ownProps);
	return {
		documentTemplates: {
			templates: docs
		}
	}
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onMenuItemClick: () => {
			dispatch(renderLibrary());
		}
	}
};

const DocumentLibraryDirectory = connect(
	mapStateToProps,
	mapDispatchToProps
)(Menu);

export default DocumentLibraryDirectory;
