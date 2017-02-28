(function() {
  'use strict';

  angular
    .module('betterVote', [])
    .factory('DataFromFactory', function($http, $q) {
      console.log('Making the call from Factory');
      return $http.get('api/elections').then( function(response) {
        // vm.all = response.data.elections;
        // console.log(vm.all);
        // console.log(DataFromFactory.data)
        // console.log(response.data.elections)
        return response.data.elections
      })
      // return { promise };
    })

})();
