//hdoc-dropdown.js

(function (angular, undefined) {
	function HdocDropDownDirctive($stateParams) {
		return {
			restrict: "A",
			link: function (scope, el, attrs) {

				scope.ds.getLibraryDirectory()
					.then(function (groupedDocs) {
						var tdid = $stateParams.tdid || 3;

						scope.hdocs = {};

						Object.keys(groupedDocs).forEach(function (groupName) {
							var group = groupedDocs[groupName];

							if (!group) throw new TypeError("Expected group name: " + groupName);

							var gel = $("<optgroup label=\"" + groupName + "\">").appendTo(el);

							group.forEach(function (doc) {
								scope.hdocs[doc.value] = doc;

								var selected = tdid == doc.value ? " selected" : "";
								$("<option value=\"" + doc.value + "\"" + selected + " title=\"" + doc.title + "\">" + doc.title + "</option>").appendTo(gel);
								if (!!selected) {
									scope.currentHdoc = doc;
									//console.log(scope.currentHdoc);
								}

							});
						});
					});

				el.on("change", function (e) {
					scope.currentHdoc = scope.hdocs[e.target.options[e.target.selectedIndex].value];
					scope.$apply();
				});

			}
		}
	}

	angular.module("noinfopath-biz-forms")
		.directive("hdocsDropdown", ["$stateParams", HdocDropDownDirctive])
})(angular);
