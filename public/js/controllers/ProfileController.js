(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', '$rootScope', '$window', '$http', 'DataFromFactory'];

  function ProfileController($scope, $rootScope, $window, $http, DataFromFactory) {
    let vm = this;
    vm.adminId = '';
    vm.allData = [];
    vm.currentAdmin = '';

    // if ($window.localStorage.betterVoteAdmin) {
      vm.adminId = JSON.parse($window.localStorage.betterVoteAdmin);
    // }

    DataFromFactory.allAdmins().then( function(data) {
      // console.log(data);
      vm.allData = data;
    })
    .then( function() {
      console.log(vm.allData)
      //write function to search through all admins and return the correct admin
      for (var i = 0; i < vm.allData.length; i++) {
        if (vm.adminId === vm.allData[i].googleId) {
          console.log('found admin', vm.allData[i].displayName)
          vm.currentAdmin = vm.allData[i];
          console.log(vm.currentAdmin);
          $rootScope.currentAdmin = vm.currentAdmin;
        }
      }
    })

    // console.log($scope.adminData);
    // $window.localStorage.setItem('betterVoteAdmin', JSON.stringify($rootScope.admin))
    console.log($window.localStorage);
    // console.log($rootScope.admin);

  }

})();
