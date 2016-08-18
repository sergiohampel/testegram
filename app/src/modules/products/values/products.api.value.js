(function() {
	'use strict';

	var _baseUrl = 'http://localhost:5000/api/v1/';

	angular.module('testegram.products').value('api', {
		products: resourceOf('products'),
		categories: resourceOf('categories')
	});

	function resourceOf(resourceName) {
		return _baseUrl + resourceName;
	}

})();