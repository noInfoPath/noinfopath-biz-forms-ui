//hdocs.controller.js

(function (angular, undefined) {
	function HDocsController($scope, mediumEditorHelperService, hdocsDataSource) {
		var THIS = this;

		this.closeWindow = function () {
			this.showLoader("Loading");
			window.close();
		};

		this.print = function (did) {
			this.showLoader("Generating PDF");
			location.href = "/document/print/" + did;
		};

		this.cancelEdit = function () {
			if (docInfo.existing) {
				// $scope.viewMode = !$scope.viewMode;
				this.toggleEdit();
			} else {
				window.close();
			}
		};

		this.toggleEdit = function () {
			$scope.viewMode = !$scope.viewMode;
			$(".hsl_doc").toggleClass("view-mode");
			$("[contenteditable]").each(function (i, el) {
				var $el = $(el),
					editable = $el.attr("contenteditable");

				if (editable === "true") {
					$el.attr("contenteditable", false);
				} else if (editable === "false") {
					$el.attr("contenteditable", true);
				}
			});

			if ($scope.viewMode) {
				_deactivateHooks();
			} else {
				mediumEditorHelperService.activateMediumEditor($("affidavit-viewer"));
				_activateHooks();
			}
		};

		this.submit = function (e) {
			this.showSaver("Saving");
			this.toggleEdit();
			var base64html = btoa(escape($("affidavit-viewer").html()));
			$("[name='html']").val(base64html);
			$("[name='title']").val($scope.title);
			$("[name='sop_document_template_id']").val($("#dd_affidavit option:selected").val());
			$("#hdocForm").submit();
		};

		this.showLoader = function () {
			// $scope.message = msg;
			$("#loader").toggleClass("ng-hide");
		};

		this.showSaver = function () {
			// $scope.message = msg;
			$("#saver").removeAttr("style");
		};

		function _activateHooks() {
			$("affidavit-viewer").find(".js-check-box").on("click", function () {
				return $(this).toggleClass("checked");
			});
		}

		function _deactivateHooks() {
			$("affidavit-viewer").find(".js-check-box").on("click", function () {
				// return $(this).toggleClass("checked");
				return;
			});
		}

		$scope.hdocNS = {
			hello: "I am now in HDOCS!!!",

		};

		// $scope.title = docInfo.title;
		// $scope.viewMode = docInfo.existing;
		// $scope.message = "Loading";

		// if (!docInfo.existing) {
		// 	mediumEditorHelperService.activateMediumEditor($("affidavit-viewer"));
		// 	_activateHooks();
		// }

		hdocsDataSource.init("https://restapi.sop.hsl.test:8443", localStorage.access_token);
		$scope.ds = hdocsDataSource;
		//this.ds = hdocsDataSource;
	}

	angular.module("noinfopath-biz-forms")
		.controller("hdocsController", ["$scope", "mediumEditorHelperService", "hdocsDataSource", HDocsController]);
})(angular);
