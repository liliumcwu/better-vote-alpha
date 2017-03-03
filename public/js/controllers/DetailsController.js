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
    vm.currentAdminElection = [];
    vm.checkElectionActive = checkElectionActive;
    console.log(vm.params);

    //Find all elections of a Particular Admin //Refactor DRY to FACTORY
    DataFromFactory.allData().then( function(data) {
      vm.all = data;
      console.log('All elections', vm.all)
      for (var i = 0; i < vm.all.length; i++) {
        if (vm.all[i]._id === vm.params) {
          vm.currentAdminElection = vm.all[i];
        }
      }
      console.log('Current Admin Election', vm.currentAdminElection);
    })

    function checkElectionActive() {
      if (vm.currentAdminElection.hasClosed) {
        return 'Election Closed... Counting Votes'
      }
      else {
        return 'Still Collecting Votes'
      }
    }

  }

})();