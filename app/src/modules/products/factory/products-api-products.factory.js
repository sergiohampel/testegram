(function() {
  'use strict';

  angular.module('testegram.products').factory('ProductsService', ProductsService);

  /* @ngInject */
  function ProductsService($resource, api) {
    return $resource(api.products + '/:id', { id: '@_id' }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();