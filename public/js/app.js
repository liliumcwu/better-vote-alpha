(function() {
  'use strict';

  angular
    .module('betterVote', ['ui.router'])
    .config(MainRouter);

  MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

  function MainRouter($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html'
    })
    .state('test', {
      url: '/test',
      templateUrl: 'test.html'
    })
    // .state('about', {
    //   url: '/about',
    //   templateUrl: 'about.html'
    // })

   $urlRouterProvider.otherwise('/');

  }

})();
