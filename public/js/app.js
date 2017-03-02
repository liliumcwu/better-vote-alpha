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
          if ($location.$$path === '/profile' || $location.$$path === '/elections' ) {
            Materialize.toast('You must be logged in', 3000);
            $location.path('/login');
          }
          // console.log($location.$$path)
        }
      });
}])


  // authProvider.$inject = ['$authProvider'];
  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider', '$authProvider'];

  // function authProvider($authProvider) {
  //    $authProvider
  //     .google({
  //       clientId: '1097906421619-smjmditjlb2ui51jfis1bgegjmv4r3ca.apps.googleusercontent.com'
  //     });

  //     //Google
  //   // $authProvider
  //   // .google({
  //   //   url: '/auth/google',
  //   //   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/auth',
  //   //   redirectUri: window.location.origin || window.location.protocol + '//' + window.location.host,
  //   //   scope: ['profile', 'email'],
  //   //   scopePrefix: 'openid',
  //   //   scopeDelimiter: ' ',
  //   //   clientId: '1097906421619-smjmditjlb2ui51jfis1bgegjmv4r3ca.apps.googleusercontent.com',
  //   //   requiredUrlParams: ['scope'],
  //   //   optionalUrlParams: ['display'],
  //   //   display: 'none',
  //   //   type: '2.0',
  //   //   popupOptions: { width: 452, height: 633 }
  //   // });

  // }

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
      controller: 'ElectionsController'
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
      controller: 'ProfileController'
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
        Materialize.toast('Sorry, invalid url!')
        $location.path('/')
    });

   $authProvider
      .google({
        clientId: '1097906421619-smjmditjlb2ui51jfis1bgegjmv4r3ca.apps.googleusercontent.com'
      });
  }


})();
