(function() {
  'use strict';

  angular
    .module('betterVote', [])
    .service('helloWorldFromService', function() {
      this.sayHello = function() {
        return "Hello, Worldddd from Service!"
      }
    })
    .service('testWorldFromService', function() {
      this.sayHello = function() {
        return "Hello, Test from Service!"
      }
    })

})();
