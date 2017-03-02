(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('NavController', NavController);

  function NavController($scope, $auth, $window, $location, DataFromFactory) {
    //Materialize mobile collapse initializiation
    $(".button-collapse").sideNav();
    // if (!$window.localStorage.betterVoteAdmin) {
    // //     // $log.log("user not logged, redirecting to Login view");
    // //     // Redirect to Login view
      // $scope.$state.go('/login');
      // $rootScope.$state.go('login')
    // }

    let vm = this;
    vm.logout = logout;

    // $scope.isAuthenticated = function() {
    //   return $auth.isAuthenticated();
    // };

    $scope.isAuthenticated = function() {
      return DataFromFactory.hasAdminLocalStorage();
    }
    // console.log($scope.isAuthenticated);

    function logout() {
      $window.localStorage.removeItem('betterVoteAdmin');
      $location.path('/');
    }

  }

})();
