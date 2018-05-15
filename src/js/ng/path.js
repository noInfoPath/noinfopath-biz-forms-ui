//path.js

(function (angular, undefined) {
	function HdocPathService() {
		this._uriTemplate = null;

		this.init = function (uriTemplate) {
			this._uriTemplate = $interpolate(SOC_HDOC_NEW);
		}
	}

	angular.module("noinfopath-biz-forms")
		.directive("path", ["$interpolate", HdocPathService])
})(angular);
