(function(){
	'use strict';

	angular.module('testegram.products').directive('productsList', productsList);

	/* @ngInject */
	function productsList(){
    var directive = {
			restrict: 'E',
			templateUrl: 'modules/products/views/products-list-template.view.html',
			replace: true,
      scope: {
				items: '=',
				remove: '&'
			},
			link: link
		};

		return directive;

		function link(scope, element, attrs){
		}
	}
})();