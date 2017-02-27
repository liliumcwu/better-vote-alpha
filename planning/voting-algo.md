### Voting Algo Plan

##### Majority func
```javascript

//Tests

/* console.log(findMajority(31)); //16
console.log(findMajority(30)); //16
console.log(findMajority(16)); //9
console.log(findMajority(15)); //8 */

const n = [<:votes>]

function findMajority(n) {
  const length = n.length;
  let majorityNum = Math.trunc( (length / 2) + 1 );
  return majorityNum;
}

const testArr = [
  {a:'a'},
  {b:'b'},
  {c:'c'},
  {d:'d'},
  {a:'a'},
  {b:'b'},
  {c:'c'},
  {d:'d'},
  {a:'a'},
  {b:'b'},
  {c:'c'},
  {d:'d'},
  {a:'a'},
  {b:'b'},
  {c:'c'},
  {d:'d'}
];

console.log(findMajority(testArr)); //9

```
