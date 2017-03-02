(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('ElectionsController', ElectionsController)

  //Factory Style
  ElectionsController.$inject = ['$http', '$scope', 'DataFromFactory'];

  function ElectionsController($http, $scope, DataFromFactory) {
    const vm = this;
    vm.all = [];
    vm.electionBallots = [];
    vm.rounds = {};
    vm.winner;

    //Service
    // $scope.hello = helloWorldFromService.sayHello();
    // $scope.test = testWorldFromService.sayHello();

    //Factory
    // DataFromFactory.then(function(data) {
    //   $scope.factoryTest = JSON.stringify(data);
    // });

    //Create election candidate form funcs

    $scope.candidates = [{id: 'candidate-1'}, {id: 'candidate-2'}]

    $scope.addNewCandidate = function() {
      var last = $scope.candidates.length - 1;
      var newIdNo = +$scope.candidates[last].id.substring(10) + 1;
      $scope.candidates.push({'id':'candidate-' + newIdNo});
    };

    $scope.showRemoveCandidate = function(candidate) {
      return candidate.id !== $scope.candidates[0].id;
    };

    $scope.removeCandidate = function(index) {
      $scope.candidates.splice(index, 1);
      return
    }

    //End election candidate funcs


    DataFromFactory.allData().then( function(data) {
      vm.all = data;
    })
    .then( function() {
      var electionBallots = DataFromFactory.assembleBallots(vm.all[0]);
      vm.electionBallots = electionBallots;
      console.log('from vm.electionBallots', vm.electionBallots)
    })
    .then( function() {
      console.log('entering winning logic');
      var winner = DataFromFactory.findWinner(vm.electionBallots)
      console.log(winner);
      vm.winner = winner;
      console.log('async test from within findWinner function')
    })

//MOVED TO INDIAN FACTORY.JS HELPER
    // function assembleBallots(election) {
    //   let ballots = election.ballots;
    //   console.log(ballots);
    //   for (let i = 0; i < ballots.length; i++) {
    //     vm.electionBallots.push(ballots[i].votes)
    //   }
    //   console.log(vm.electionBallots);
    //   return
    // }

//MOVED TO INDIAN FACTORY.JS HELPER
    // let counter = '1';
    // function findWinner(arrBallots) {
    //   vm.rounds[counter] = {};
    //   for (let i = 0; i< arrBallots.length; i++) {
    //     vm.rounds[counter][arrBallots[i][0]] = null;
    //     // counter += '1';
    //   }
    //   console.log(vm.rounds)
    // }


    // getAllElections();


    //GET all available elections
    // function getAllElections() {
    //   $http.get('api/elections').then( function(response) {
    //     vm.all = response.data.elections;
    //     console.log(vm.all);
    //     console.log(DataFromFactory.data)
    //   }, function(err) {
    //     console.log(err);
    //   })
    // };

    //Find all elections of a Particular Admin


  }

})();
