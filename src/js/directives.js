(function (angular, undefined) {

	function AffidavitTitleDirective() {
		function _compile(el, attrs) {
			el.find("control").html(
				'<input ng-hide="viewMode" class="form-control" ng-model="title"></input><p ng-show="viewMode" class="no-p-t-lg no-p-l-md" ng-bind="title"></p>'
			);
			return _link;
		}

		function _link(scope, el, attrs) {

		}

		return {
			restrict: "A",
			compile: _compile
		};
	}

})(angular);
