(function() {
  'use strict';

  angular.module('testegram.products').directive('productsList', productsList);

  /* @ngInject */
  function productsList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'modules/products/views/products-list-template.view.html',
      replace: true,
      scope: {
        items: '=',
        remove: '&'
      },
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr) {
      scope.$watch('items', function(newVal, oldVal) {
        if (newVal) {
          scope.hasProducts = (newVal.length > 0) ? true : false;
        }
      });
    }
  }
})();