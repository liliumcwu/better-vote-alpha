(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('ElectionsController', ElectionsController)

  //Factory Style
  ElectionsController.$inject = ['$http', '$scope', '$rootScope', '$location', '$state', 'DataFromFactory'];

  function ElectionsController($http, $scope, $rootScope, $location, $state, DataFromFactory) {
    const vm = this;
    vm.all = [];
    vm.currentAdminElections = [];
    vm.electionBallots = [];
    vm.rounds = {};
    vm.winner;
    vm.election = {};
    vm.currentAdmin = $rootScope.currentAdmin;
    console.log(vm.currentAdmin._id);
    vm.election.admin = vm.currentAdmin;
    vm.election.electionTitle = 'My Test Election';
    vm.closeElection = closeElection;

    // DataFromFactory.allAdmins().then( function(data) {
    //   // console.log(data);
    //   vm.allData = data;
    // })
    // .then( function() {
    //   console.log(vm.allData)
    //   //write function to search through all admins and return the correct admin
    //   for (var i = 0; i < vm.allData.length; i++) {
    //     if (vm.adminId === vm.allData[i].googleId) {
    //       console.log('found admin', vm.allData[i].displayName)
    //       vm.currentAdmin = vm.allData[i];
    //       console.log(vm.currentAdmin);
    //       $rootScope.currentAdmin = vm.currentAdmin;
    //     }
    //   }
    // })

    //Create election candidate form funcs

    $scope.candidates = [{id: 'candidate1', name: 'BQ'}, {id: 'candidate2', name: 'BaoQua'}, {id: 'candidate3', name: 'BaoChaos'}];

    $scope.addNewCandidate = function() {
      var last = $scope.candidates.length - 1;
      var newIdNo = +$scope.candidates[last].id.substring(9) + 1;
      $scope.candidates.push({'id':'candidate' + newIdNo});
    };

    $scope.showRemoveCandidate = function(candidate) {
      return candidate.id !== $scope.candidates[0].id;
    };

    $scope.removeCandidate = function(index) {
      $scope.candidates.splice(index, 1);
      return
    }

    //Create voters form funcs

    $scope.voters = [
      {id: 'voter1', fName: 'Andrew', email: 'andrew@andrew.com'},
      {id: 'voter2', fName: 'Ritwik', email: 'ritwik@ritwik.com'},
      {id: 'voter3', fName: 'Adam', email: 'adam@adam.com'},
      {id: 'voter4', fName: 'An', email: 'an@an.com'},
      {id: 'voter5', fName: 'Michelle', email: 'michelle@michelle.com'},
      {id: 'voter6', fName: 'Kora', email: 'koram@kora.com'},
      {id: 'voter7', fName: 'Tim', email: 'tim@tim.com'},
    ];

    $scope.addNewVoter = function() {
      var last = $scope.voters.length - 1;
      var newIdNo = +$scope.voters[last].id.substring(5) + 1;
      $scope.voters.push({'id':'voter' + newIdNo});
    };

    $scope.showRemoveVoter = function(voter) {
      return voter.id !== $scope.voters[0].id;
    };

    $scope.removeVoter = function(index) {
      $scope.voters.splice(index, 1);
      return
    }

    //Submit form funcs

    $scope.submitForm = function(form) {
      console.log('clicked submitForm');
      var election = vm.election;
      console.log(election);
      election.candidates = [];
      var candidates = $scope.candidates;
      var voters = $scope.voters;
      for (var i = 0; i < candidates.length; i++) {
        election.candidates.push(candidates[i].name);
      }
      election.voters = [];
      for (var j = 0; j < voters.length; j++) {
        var newObj = {};
        newObj.fName = voters[j].fName;
        newObj.email = voters[j].email;
        election.voters.push(newObj);
      }
      console.log(election);
      $http.post('api/elections', election).then( function(response) {
        console.log('enters post');
        console.log(response.data);
        if (response.data.status === 200) {
          DataFromFactory.allData().then( function(data) {
            vm.all = data;
            console.log('All elections', vm.all)
            vm.currentAdminElections = [];
            for (var i = 0; i < vm.all.length; i++) {
              if (vm.all[i].admin[0]._id === vm.currentAdmin._id) {
                vm.currentAdminElections.push(vm.all[i])
              }
            }
            console.log('All current Admin Elections', vm.currentAdminElections);
          })
          Materialize.toast(`${election.electionTitle} created!`, 2000)
          $location.path('/elections/active');
        }
      }, function(err) {
        console.log(err);
      })
    }

    //END FORM FUNCS

    //Find all elections of a Particular Admin
    DataFromFactory.allData().then( function(data) {
      vm.all = data;
      console.log('All elections', vm.all)
      for (var i = 0; i < vm.all.length; i++) {
        if (vm.all[i].admin[0]._id === vm.currentAdmin._id) {
          vm.currentAdminElections.push(vm.all[i])
        }
      }
      console.log('All current Admin Elections', vm.currentAdminElections);
    })

    function closeElection() {
      console.log('clicked');
      var path = $location.$$path;
      // console.log(path)
      $http.post('api' + path).then( function(res) {
        console.log(res.status);
        if (res.status === 200) {
          $state.reload();
        }

      })
    }

  }

})();
