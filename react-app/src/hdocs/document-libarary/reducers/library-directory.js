import {
	FETCH_LIBRARY_SUCCESS,
	FETCH_LIBRARY_ERROR
} from "../type-defs";

export default function reducer(state = {}, action) {
	console.log("action", action);
	switch (action.type) {
	case FETCH_LIBRARY_SUCCESS:
		var grouped = {};
		action.libraryDirectory.forEach(item => {
			var group = grouped[item.group];
			if (!group) group = grouped[item.group] = [];
			group.push({ title: item.title, id: item.id });

		});
		return grouped;
	case FETCH_LIBRARY_ERROR:
		return action.libraryDirectoryError;
	default:
		return state;
	}
}
