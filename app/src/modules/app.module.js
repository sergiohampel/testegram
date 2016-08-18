(function(){
	'use strict';

	angular.module('testegram', [
		'ui.router',
		'ngResource',
		'ngTouch',
		'ngAnimate',
		'angular-loading-bar',
		'ui.bootstrap',
		'ui.utils.masks',
		'cgPrompt',
		'testegram.products'
	]);

	angular.module('testegram').config(routeConfig);

	/* @ngInject */
	function routeConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/list');

		$stateProvider
			.state('list', {
        url: '/list',
        templateUrl: 'modules/products/views/products-list.view.html',
				controller: 'ListController',
				controllerAs: 'ListCtrl'
      })
			.state('registration', {
				url: '/registration/:id',
				templateUrl: 'modules/products/views/products-registration-form.view.html',
				controller: 'RegistrationFormController',
				controllerAs: 'RegistrationFormCtrl'
      });
		}
})();