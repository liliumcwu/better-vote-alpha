(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('ElectionsController', ElectionsController)

  //Service Style
  // ElectionsController.$inject = ['$http', '$scope', 'helloWorldFromService', 'testWorldFromService'];

  //Factory Style
  ElectionsController.$inject = ['$http', '$scope', 'DataFromFactory'];

  function ElectionsController($http, $scope, DataFromFactory) {
    const vm = this;
    vm.all = [];
    vm.electionBallots = [];

    //Service
    // $scope.hello = helloWorldFromService.sayHello();
    // $scope.test = testWorldFromService.sayHello();

    //Factory
    // DataFromFactory.then(function(data) {
    //   $scope.factoryTest = JSON.stringify(data);
    // });

    DataFromFactory.then( function(data) {
      vm.all = data;
      // console.log(vm.all);
      assembleBallots(vm.all[0]); //individual elections inserted here
    })
    // .then( assembleBallots(vm.all[0]) );

    function assembleBallots(election) {
      let ballots = election.ballots;
      console.log(ballots);
      for (let i = 0; i < ballots.length; i++) {
        vm.electionBallots.push(ballots[i].votes)
      }
      console.log(vm.electionBallots);
      return
    }


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

  }

})();
