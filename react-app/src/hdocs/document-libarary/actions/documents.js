import {
	RENDER_LIBRARY
} from "../type-defs";

export function renderLibrary(documentTemplates) {
	return {
		type: RENDER_LIBRARY,
		documentTemplates
	}
}
