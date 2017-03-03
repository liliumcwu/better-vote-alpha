(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$auth', '$location', '$rootScope', '$window'];

  function LoginController($scope, $auth, $location, $rootScope, $window) {
    // const vm = this;
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      .then(function(data) {
        console.log('You have successfully signed in with ' + provider + '!');
        // console.log(profile);
        // console.log(data.data);
        // $scope.adminData = data.data;

        // $rootScope.admin = data.data;
        $window.localStorage.setItem('betterVoteAdmin', JSON.stringify(data.data.sub))

        Materialize.toast('You have successfully signed in with ' + provider + '!', 3000)
        $location.path('/profile');
        })
        .catch(function(error) {
          if (error.message) {
            // Satellizer promise reject error.
            // toastr.error(error.message);
            Materialize.toast(error.message, 3000)
          } else if (error.data) {
            // HTTP response error from server
            // toastr.error(error.data.message, error.status);
            Materialize.toast(error.data.message, 3000)
          } else {
            // toastr.error(error);
            Materialize.toast(error, 3000)
          }
        });
    };

  };

})();
