### Voting Algo Plan

##### Majority Func
```javascript
//Constructs test array of objects
function testConstructor(num) {
  let newArr = [];
  for (let i = 1; i <= num; i++) {
    let newObj = {};
    newObj[i] = `${i}`;
    newArr.push(newObj);
  }
  return newArr;
}

//Tests array of objects for majority
function findMajority(n) {
  const length = n.length;
  let majorityNum = Math.trunc( (length / 2) + 1 );
  return majorityNum;
}

const testArr = testConstructor(100); //change number
const testArr2 = testConstructor(99); //change number

console.log(findMajority(testArr))
console.log(findMajority(testArr2))
```

##### Sorting Func
```javascript

const votes = [
  {voter: 1,
  votes: }
]

```

##### Find Winner Recursive Notes [JsBin Test](http://jsbin.com/cifuseq/edit?js,console)

```
var rounds = {};

var ballots = [
  ['A', 'B', 'C'],
  ['B', 'C', 'A'],
  ['B', 'C', 'C'],
  ['A', 'C', 'B'],
  ['C', 'B', 'A'],
  ['C', 'A', 'B'],
  ['A', 'B', 'C'],
  ['A', 'C', 'B'],
  ['C', 'B', 'A']
]

var counter = '1';

function findWinner(arrBallots) {
  console.log(arrBallots);
  var isWinner = false;
  
  //Get winning condition number
  var majorityNum = findMajority(arrBallots); // win at 5
  console.log('MajorityNum is ' + majorityNum);
  
  //Construct round object to track history
  rounds[counter] = {};
  for (var i = 0; i< arrBallots.length; i++) {
    rounds[counter][arrBallots[i][0]] = null;
    // counter += '1';
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
      return roundArr[n]; //breaks out of recursion with WINNER!
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
    findWinner(newBallots);
  }
  
}

//Helper to remove matching elements from ballots
function removeCandidate(candidate, ballots) {
  for (var i = 0; i < ballots.length; i++) {
    var index = ballots[i].indexOf(candidate);
    if (index !== -1) {
      ballots[i].splice(index, 1);
    }
  }
  return ballots;
}

//Helper to determine majority winning condition
function findMajority(n) {
  var length = n.length;
  var majorityNum = Math.trunc( (length / 2) + 1 );
  return majorityNum;
}

//Helper to determine lowest first rank votes in each round
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

findWinner(ballots);
```
