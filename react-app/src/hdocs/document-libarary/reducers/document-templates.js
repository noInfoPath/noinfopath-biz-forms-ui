import {
	RENDER_LIBRARY,
} from "../type-defs";

const defaultState = {
	libraryDirectory: {}
}

function documentTemplates(state = defaultState, action) {
	switch (action.type) {
	case RENDER_LIBRARY:
		return Object.assign({}, state, {
			templates: action.documentTemplates
		});

	default:
		return state;
	}
}

export default documentTemplates;
