//data.service.js

(function (angular, undefined) {
	var SOC_HDOCS_LIBRARY = "/sop/affidavits",
		SOC_HDOC = "/sop/hdoc/affidavit/{{caseId}}/{{orderId}}/{{serviceId}}";

	function HdocsDataSource($interpolate, $http) {
		var my = this;

		this.__accessToken = null;

		this.init = function (apiRoot, accessToken) {
			console.log(apiRoot, accessToken);
			this.__apiRoot = apiRoot;
			this.__authorization = "Bearer " + accessToken;
		};

		this.getLibraryDirectory = function () {
			return restGet(SOC_HDOCS_LIBRARY)
				.then(function (resp) {
					return resp.data;
				});
		};

		this.getHdoc = function (params) {
			var uriExp = $interpolate(SOC_HDOC),
				uri = uriExp(params);

			return restGet(uri)
		};

		function restGet(uri) {

			var url = my.__apiRoot + uri,
				options = {
					method: "GET",
					url: url,
					withCredentials: true,
					headers: {
						Authorization: my.__authorization,
						"Content-Type": "application/json",
						"Accept": "application/json"
					}
				};

			// if (!!params) {
			// 	req.data = params;
			// }

			console.log(options);
			return $http(options);
		}
	}

	angular.module("noinfopath-biz-forms")
		.service("hdocsDataSource", ["$interpolate", "$http", HdocsDataSource])

})(angular);
