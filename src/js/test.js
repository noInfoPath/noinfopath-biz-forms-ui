//test.js

(function (angular, undefined) {
	angular.module("noinfopath-biz-forms")
		.controller("hdocsTestController", ["hdocsDataSource", function (hdocsDataSource) {
			hdocsDataSource.init("https://restapi.sop.hsl.test:8443", localStorage.access_token);

			this.getAvailableDocuments = function () {
				hdocsDataSource.getLibraryDirectory()
					.then(console.log.bind(console))
			}

			this.getNewHdoc = function () {
				hdocsDataSource.getNewHdoc({
						serviceId: 356,
						templateId: 3
					})
					.then(function (resp) {
						return resp.data;
					})
			}
		}]);

})(angular);
