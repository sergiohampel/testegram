(function() {
  'use strict';

  angular.module('testegram.products').factory('CategoriesService', CategoriesService);

  /* @ngInject */
  function CategoriesService($resource, api) {
    return $resource(api.categories + '/:id', { id: '@_id' });
  }
})();