//global.js

var __GLOBAL__ = typeof window === "object" ? window : typeof global === "object" ? global : {};

__GLOBAL__.NAMESPACE_EXITS = function NAMESPACE_EXITS(namespace) {
	return __GLOBAL__[namespace];
};

__GLOBAL__.CREATE_NAMESPACE = function CREATE_NAMESPACE(namespace) {
	if (!NAMESPACE_EXITS(namespace)) __GLOBAL__[namespace] = {};
};

__GLOBAL__.DEFINE = function DEFINE(namespace, propName, value) {
	__GLOBAL__[namespace][propName] = value;
};

module.exports = __GLOBAL__;
