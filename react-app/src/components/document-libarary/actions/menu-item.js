import {
	SELECT_DOCUMENT
} from "../type-defs";

export function selectDocument(documentId) {
	return {
		type: SELECT_DOCUMENT,
		documentId
	}
}
