### Voting Algo Plan

##### Majority func
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
