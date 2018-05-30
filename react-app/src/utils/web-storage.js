class MockStorage {

	constructor() {
		this._store = {};
	}

	get length() {
		var l = 0;
		for (var x in this._store) {
			l++;
		}
		return l;
	}

	key(i) {
		var l = 0;
		for (var x in this._store) {
			if (i == l) return x;
		}
	}

	setItem(k, v) {
		this._store[k] = v;
	}

	getItem(k) {
		return this._store[k];
	}

	removeItem(k) {
		delete this._store[k];
	}

	clear() {
		this._store = null;
		this._store = {};
	}
}

export default class WebStorage {
	constructor(storetype) {
		if (typeof window[storetype] === "object") {
			this._store = window[storetype];
		} else {
			this._store = new MockStorage();
		}
	}

	get length() {
		var l = 0;
		for (var x in this._store) {
			l++;
		}
		return l;
	}


	key(i) {
		return this._store.key(i);
	}

	setItem(k, v) {

		if (typeof v === "object") {
			this._store.setItem(k, JSON.stringify(v));
		} else {
			this._store.setItem(k, v);
		}
	};

	getItem(k) {
		var x = this._store.getItem(k);


		try {
			return JSON.parse(x);
		} catch (err) {
			return x
		}
	}

	removeItem(k) {
		this._store.removeItem(k);
	}

	clear() {
		this._store.clear();
	}
}
