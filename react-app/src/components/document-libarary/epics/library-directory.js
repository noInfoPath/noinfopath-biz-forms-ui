import * as Rx from "rxjs";
import { fromPromise } from "rxjs/observable/fromPromise";
import { ajax } from 'rxjs/observable/dom/ajax';
import { mergeMap } from 'rxjs/add/operator/mergeMap';
import { map } from 'rxjs/add/operator/map';

import {
	FETCH_LIBRARY,
	FETCH_LIBRARY_SUCCESS,
	FETCH_LIBRARY_ERROR
} from "../type-defs";

import {
	fetchLibrarySuccess,
	fetchLibraryError
} from "../actions/library-directory";

const tempJWT = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UVkJOVVF5TVRRek16RTBNVVUwUmtJMk56RTJOek0xTjBVM09UVTJRa1kwUWpJd05qZEJOZyJ9.eyJpc3MiOiJodHRwczovL2hzbC1zb3AuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDU4Zjk0YzlhMDRiOGU4NTQ0OTcwNzA5NyIsImF1ZCI6WyJodHRwczovL3Jlc3RhcGkuc29wLmhlYXZlbnNlbnRsZWdhbC5jb20iLCJodHRwczovL2hzbC1zb3AuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUyNjM0MzczOSwiZXhwIjoxNTI2NDMwMTM5LCJhenAiOiJoRzk2bDZIdHhnNzYwcHRySmlrM1NqU2JoTDBFbmtLTyIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgYWRkcmVzcyBwaG9uZSBjcnVkOmFsbG90aGVyIHJlYWQ6YXBwY29uZmlnIG9mZmxpbmVfYWNjZXNzIiwiZ3R5IjoicGFzc3dvcmQifQ.gkIZq_-6HMIWLI3wkIla0L6IXDpVoDOMSb9M5I3XfHgWXO3Lj7Eq4S7GVX2T9FsP8jiwZj8TvbMbtkh0UHg21_OyqsXdMzB9GDAYndbvMciy-o3pIHLQQy4Xb9-l5-JYXULfxazEcXfnVdfsk2dzvSvv9V_bPAHFU4XC87rt4ILdT2ZV27EzXNVsgyF44ekEwMsFPXET6mlUlSOeABj4GpVG7sMLf1u6LdDDPg9H4ZDuQf8r0dq0S6HoxehcxSLlnYHXMwRuvKlN6UVqoGhjRd-paANE3Ds9NQrYxbrzEbHBz53BtJk1h7tVTiR254TBQePi9MCMUnu4rTvtyFrr9A";

const url = "https://restapi.sop.hsl.test:8443/hdoc/directory";

const request = {
	url: url,
	headers: {
		"Authorization": "Bearer " + tempJWT,
		"Accept": "application/json"
	},
	responseType: "json"
};


const sampleData = () => {
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

const getLibraryDirectory = filter => fromPromise(fetch(url, request)
	.then(response => response.json()));




// console.log(obs1);
const fetchLibraryDirectoryEpic = (action$, store) => action$.ofType(FETCH_LIBRARY)
	.mergeMap(action => ajax(request)
		.map(results => fetchLibrarySuccess(results.response))
	);

// 	.m
// .mergeMap(obs1);

export default fetchLibraryDirectoryEpic;
