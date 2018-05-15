//data.service.js

(function (angular, undefined) {
	var SOC_HDOCS_LIBRARY = "/hdoc/directory",
		SOC_HDOC_NEW = "/hdoc/html/{{serviceId}}/{{templateId}}";

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
					var hsh = {};

					resp.data.forEach(function (item) {

						item.group = item.group.toTitleCase();

						if (!hsh[item.group]) {
							hsh[item.group] = [];
						}

						// if (item.id === Number(req.params.tdid)) {
						// 	hsh[item.group].push({
						// 		"value": item.id,
						// 		"title": item.title,
						// 		"selected": item.id === Number(req.params.tdid) ? " selected" : ""
						// 	});
						// 	model.title = item.title;
						// } else {
						hsh[item.group].push({
							"value": item.id,
							"title": item.title,
							"selected": ""
						});
						// }
					});

					return hsh;
				});
		};

		this.getNewHdoc = function (params) {
			var uriExp = $interpolate(SOC_HDOC_NEW),
				uri = uriExp(params);

			return restGet(uri, "text/html")
				.then(function (resp) {
					return resp.data;
				})
		};

		function restGet(uri, contentType) {

			var url = my.__apiRoot + uri,
				options = {
					method: "GET",
					url: url,
					withCredentials: true,
					headers: {
						Authorization: my.__authorization,
						"Content-Type": "application/json",
						"Accept": contentType || "application/json"
					}
				};

			// if (!!params) {
			// 	req.data = params;
			// }

			return $http(options);
		}
	}

	angular.module("noinfopath-biz-forms")
		.service("hdocsDataSource", ["$interpolate", "$http", HdocsDataSource])

})(angular);
