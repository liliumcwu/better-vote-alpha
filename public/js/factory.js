(function() {
  'use strict';

    angular
    .module('betterVote')
    .factory('DataFromFactory', function($http, $q) {
      console.log('Making the call from Factory');
      var service = {};
      service.allData = allData;
      service.assembleBallots = assembleBallots;
      service.findWinner = findWinner;

      function allData() {
        return $http.get('api/elections').then( function(response) {
          return response.data.elections
        });
      }

      function assembleBallots(election) {
        let ballots = election.ballots;
        let electionBallots = [];
        // console.log(ballots);
        for (let i = 0; i < ballots.length; i++) {
          electionBallots.push(ballots[i].votes)
        }
        // console.log(electionBallots);
        return electionBallots;
      }

      var counter = '1';
      var rounds = {};

      function findWinner(arrBallots) {
        var winner;
        console.log(arrBallots);
        var isWinner = false;

        //Get winning condition number
        var majorityNum = findMajority(arrBallots); // win at 5
        console.log('MajorityNum is ' + majorityNum);

        //Construct round object to track history
        rounds[counter] = {};
        for (var i = 0; i< arrBallots.length; i++) {
          rounds[counter][arrBallots[i][0]] = null;
        }
        console.log(rounds)

        //Reverse dynamically track to prep count first rank votes
        var keyArr = Object.keys(rounds); //Gets round keys
        console.log(keyArr)

        //Gets keys for each round and uses the index position of the last element
        var roundArr = Object.keys(rounds[keyArr[(keyArr.length - 1)]]);
        console.log(roundArr)

        //Count first rank votes and store in round key '1' inside round object
        for (var j = 0; j < arrBallots.length; j++) {
          var index = roundArr.indexOf(arrBallots[j][0])
          // console.log(index)
          rounds[counter][roundArr[index]] += 1;
        }
        console.log(rounds)

        //Check if any current round candidate matches winning number
        for (var n = 0; n < roundArr.length; n++) {
          console.log('Checking ' + roundArr[n] + '\'s winning condition for round ' + counter.length)
          if (rounds[counter][roundArr[n]] >= majorityNum) {
            console.log(roundArr[n] + ' is the WINNER in round ' + counter.length);
            isWinner = true;
            var winner = roundArr[n]; //'A'
            counter = '1';
            console.log('Winner: ', winner);
            // return winner; //breaks out of recursion with WINNER!
          }
          else {
            console.log(roundArr[n] + ' is not the winner in round ' + counter.length);
          }
        }

        //Continue if no winner;
        if (isWinner === false) {
          //Discard lowest first rank candidate
          var lowest = lowestCandidate(roundArr, keyArr, counter, rounds)
          console.log('Lowest candidate in round ' + counter.length + ' is ' + lowest.lowest + ' with ' + lowest.cur + ' first rank votes.' )

          //Remove lowest candidate from ballots
          var newBallots = removeCandidate(lowest.lowest, arrBallots);
          counter += '1';
          console.log(counter);
          return findWinner(newBallots); //recursively call again
        }
        return winner;
      }

      //Service helper to remove matching elements from ballots
      function removeCandidate(candidate, ballots) {
        for (var i = 0; i < ballots.length; i++) {
          var index = ballots[i].indexOf(candidate);
          if (index !== -1) {
            ballots[i].splice(index, 1);
          }
        }
        return ballots;
      }

      //Service helper to determine majority winning condition
      function findMajority(n) {
        var length = n.length;
        var majorityNum = Math.trunc( (length / 2) + 1 );
        return majorityNum;
      }

      //Service helper to determine lowest first rank votes in each round
      function lowestCandidate(roundArr, keyArr, counter, rounds) {
        var cur = rounds[counter][roundArr[0]],
            lowest;
        for (var i = 1; i < roundArr.length; i++) {
          if (rounds[counter][roundArr[i]] < cur) {
            lowest = roundArr[i];
            cur = rounds[counter][roundArr[i]];
          }
        }
        return {cur: cur, lowest: lowest}
      }

      return service;
    })

})();
