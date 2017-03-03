(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('DetailsController', DetailsController)

  DetailsController.$inject = ['$stateParams', 'DataFromFactory', '$state'];

  function DetailsController($stateParams, DataFromFactory, $state) {
    // console.log($stateParams)
    let vm = this;
    vm.params = $stateParams.electionId;
    vm.all = [];
    vm.currentAdminElection = [];
    vm.checkElectionActive = checkElectionActive;
    vm.checkElection = checkElection;
    vm.findWinner = findWinner;
    vm.currentWinner;
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

    function checkElection() {
      return vm.currentAdminElection.hasClosed
    }

    function findWinner() {
      console.log('clicked');
      console.log(vm.currentAdminElection);
      var ballots = DataFromFactory.assembleBallots(vm.currentAdminElection);
      console.log(ballots);
      var winner = DataFromFactory.findWinner(ballots);
      console.log(winner);
      // winner.rounds = JSON.stringify(winner.rounds);
      winner.rounds = roundsAssembler(winner.rounds);
      console.log(winner.rounds);
      vm.currentWinner = winner;
      // $state.reload();
    }

    //findWinner Rounds assembler
    function roundsAssembler(roundsObj) {
      // console.log(roundsObj);
      var newArr = [];
      var roundsKeys = Object.keys(roundsObj);
      for (var i = 0; i < roundsKeys.length; i++) {
        newArr.push(roundsObj[roundsKeys[i]])
      }
      // roundsKeys[0]
      return newArr;
    }

  }

})();
