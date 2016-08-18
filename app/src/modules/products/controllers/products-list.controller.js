(function() {
  'use strict';

  angular.module('testegram.products').controller('ListController', ListController);

  /* @ngInject */
  function ListController(ProductsService, $state, prompt, $timeout) {
    var vm = this;

    vm.alerts = [];

    // public methods
    vm.removeProducts = removeProducts;
    vm.closeAlert = closeAlert;

    function activate() {
			getProducts();

      var socket = io('http://localhost:5000/');

      socket.on('products', function(product){
      	console.log(product);
      });
    }

    function getProducts() {
      ProductsService.get(function(resp){
        if (resp.status === 'success') {
          vm.listProducts = resp.data;
        }
      });
    }

    function removeProducts(id) {
      prompt({
        'title': 'Exclusão do produto',
        'message': 'Deseja realmente excluir este produto?',
        'buttons': [
          {
            'label': 'Excluir',
            'cancel': false,
            'primary': true
          }
        ]
      }).then(function(result){
        ProductsService.remove({id: id }, function(resp){
          if (resp.status === 'success') {
            vm.listProducts = vm.listProducts.filter(function(item){
              return item._id !== id;
            });

            $timeout(function() {
              closeAlert(0);
            }, 4000);

            addAlert('success', resp.message);
          }
        });
      });
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