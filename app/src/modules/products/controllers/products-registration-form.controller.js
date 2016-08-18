(function() {
  'use strict';

  angular.module('testegram.products').controller('RegistrationFormController', RegistrationFormController);

  /* @ngInject */
  function RegistrationFormController(CategoriesService, ProductsService, $state, $timeout) {
    var vm = this;

    vm.alerts = [];

    // public methods
    vm.saveCategory = saveCategory;
    vm.saveProduct = saveProduct;
    vm.closeAlert = closeAlert;

    function activate() {
      getCategories();
    }

    function getCategories() {
      CategoriesService.get(function(resp){
        if (resp.status === 'success') {
          vm.listCategories = resp.data;
        }
      });
    }

    function saveCategory(form) {
      if (form.$valid) {
        CategoriesService.save({name: vm.categoryName}, function(resp){
          if (resp.status === 'success') {
            vm.categoryName = '';
            getCategories();
            addAlert('success', resp.message);
          }
        });
      }
    }

    function saveProduct(form) {
      if (form.$valid) {
        var params = {
          name: vm.productName,
          url: vm.url,
          category: vm.category,
          price: vm.price,
          promotionalPrice: vm.promotionalPrice
        };

        if ($state.params.id) {
          ProductsService.update({id: $state.params.id}, params, function(resp){
            responseProduct(resp);
          });
        } else {
          ProductsService.save(params, function(resp){
            responseProduct(resp);
          });
        }
      }
    }

    function responseProduct(resp){
      if (resp.status === 'success') {
        $timeout(function() {
          $state.go('list');
        }, 4000);
        addAlert('success', resp.message);
      }
    }

    function addAlert(type, message) {
      vm.alerts.push({type: type, msg: message});
    }

    function closeAlert(index) {
      vm.alerts.splice(index, 1);
    }

    activate();
  }
})();