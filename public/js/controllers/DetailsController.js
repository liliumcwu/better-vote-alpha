(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('DetailsController', DetailsController)

  DetailsController.$inject = ['$stateParams', 'DataFromFactory'];

  function DetailsController($stateParams, DataFromFactory) {
    // console.log($stateParams)
    let vm = this;
    vm.params = $stateParams.electionId;
    vm.all = [];
    console.log(vm.params);

    DataFromFactory.allData().then( function(data) {

    }

  }

})();
