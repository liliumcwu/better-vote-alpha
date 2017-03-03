(function() {
  'use strict';

  angular
    .module('betterVote', ['ui.router', 'satellizer'])
    .config(MainRouter)
    // .run(function ($rootScope, $state, $stateParams) {
    //     $rootScope.$state = $state;
    //     $rootScope.$stateParams = $stateParams;
    //     console.log('hey')
    // })
    .run(["$rootScope", "$state", '$window', '$location', function($rootScope, $state, $window, $location) {

      $rootScope.$on('$locationChangeStart', function(event, next, current) {
        if (!$window.localStorage.betterVoteAdmin) {
          // $state.go('login');
          if ($location.$$path.includes('/profile') || $location.$$path.includes('/elections') ) {
            Materialize.toast('You must be logged in', 3000);
            $location.path('/login');
          }
          // console.log($location.$$path)
        }
      });
}])

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

  function MainRouter($stateProvider, $urlRouterProvider, $authProvider) {
    /**
     * Helper auth functions
     */
    // var skipIfLoggedIn = ['$q', '$auth', function($q, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.reject();
    //   } else {
    //     deferred.resolve();
    //   }
    //   return deferred.promise;
    // }];

    // var loginRequired = ['$q', '$location', '$auth', function($q, $location, $auth) {
    //   var deferred = $q.defer();
    //   if ($auth.isAuthenticated()) {
    //     deferred.resolve();
    //     // return true
    //   } else {
    //     Materialize.toast('Must be logged in', 3000)
    //     $location.path('/login');
    //   }
    //   // return deferred.promise;
    //   // return true;
    // }];

    var loginRequired = function() {
      return false;
    }


    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('elections', {
      url: '/elections',
      templateUrl: 'elections.html',
      controller: 'ElectionsController',
      controllerAs: 'election'
    })
    .state('elections.active', {
      url: '/active',
      templateUrl: 'html/partials/elections-active.html'
    })
    .state('elections.create', {
      url: '/create',
      templateUrl: 'html/partials/elections-create.html'
    })
    .state('elections.details', {
      url: '/details/:electionId',
      templateUrl: 'html/partials/elections-details.html',
      controller: 'DetailsController',
      controllerAs: 'details'
      // controller: function ($stateParams) {
      //     console.log($stateParams);
      // }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'html/partials/login.html',
      controller: 'LoginController'
      // resolve: {
      //   skipIfLoggedIn: skipIfLoggedIn
      // }
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'html/partials/profile.html',
      controller: 'ProfileController',
      controllerAs: 'profile'
      // resolve: {
      //   loginRequired: loginRequired
      // }
    })
    // .state('about', {
    //   url: '/about',
    //   templateUrl: 'about.html'
    // })

   // $urlRouterProvider.otherwise('/');

   $urlRouterProvider.otherwise(function($injector, $location){
        // ... some advanced code...
        // console.log($location.$$path)
      if ($location.$$path === '') {
        $location.path('/')
        // Materialize.toast('Sorry, invalid url!')
      } else {
        Materialize.toast('Sorry, invalid url!', 2000)
        $location.path('/')
      }
    });

   $authProvider
      .google({
        clientId: '1097906421619-smjmditjlb2ui51jfis1bgegjmv4r3ca.apps.googleusercontent.com'
      });
  }


})();
