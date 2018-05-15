import {
	SELECT_DOCUMENT
} from "../type-defs";

const defaultState = 0;

function menuItem(state = defaultState, action) {
	switch (action.type) {

	case SELECT_DOCUMENT:
		return action.documentId;

	default:
		return state;
	}
}

export default menuItem;
