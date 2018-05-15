//hdocs-editor.js

(function (angular, undefined) {
	function HdocEditorDirctive($stateParams) {
		return {
			restrict: "EA",
			link: function (scope, el, attrs) {
				scope.$watch("currentHdoc", function (n, o, s) {


					console.log($stateParams);
					if (n) {
						hdocsDataSource.getNewHdoc({
							serviceId: 356,
							templateId: 3
						})

					}
					//el.html("<h1>" + JSON.stringify(scope.currentHdoc) + "</h1>");
				});
			}
		}
	}

	angular.module("noinfopath-biz-forms")
		.directive("hdocsEditor", ["$stateParams", HdocEditorDirctive])
})(angular);
