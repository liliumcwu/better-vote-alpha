(function() {
  'use strict';

  angular
    .module('betterVote')
    .controller('NavController', NavController);

  function NavController() {
    $(".button-collapse").sideNav();

  }

})();