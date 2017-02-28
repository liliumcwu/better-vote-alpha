(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('ElectionsController', ElectionsController)

  ElectionsController.$inject = ['$http', '$scope', 'helloWorldFromService', 'testWorldFromService'];

  function ElectionsController($http, $scope, helloWorldFromService, testWorldFromService) {
    const vm = this;

    $scope.hello = helloWorldFromService.sayHello();

    $scope.test = testWorldFromService.sayHello();

    getAllElections();

    vm.all = [];

    //GET all available elections
    function getAllElections() {
      $http.get('api/elections').then( function(response) {
        vm.all = response.data.elections;
        console.log(vm.all);
      }, function(err) {
        console.log(err);
      })
    };

  }

})();
