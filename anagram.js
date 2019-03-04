'use strict';

const HashMap = require('./hashMap');
const anagramHash = new HashMap();

function compareHash(hash1, hash2) {
  return (JSON.stringify(hash1._slots) === JSON.stringify(hash2._slots));
  // return (hash1._slots.join('') === hash2._slots.join(''));
}

const hashArray = [];
function anagramGroup(arr) {
  arr.map(word => {
    // split word to push letter into hash map
    const splitWord = word.split('');
    const hash = new HashMap();
    splitWord.forEach(letter => hash.set(letter, 'boop'));
    hashArray.push(hash);
  });
  return hashArray;
}

function builder(hashArray) {
  let unfilteredArray = [];

  for (let i = 0; i < hashArray.length; i++) {
    unfilteredArray.push(hashArray.filter(hashMap => compareHash(hashMap, hashArray[i]) === true));
  }

  // Filter the unfiltered
  console.log(unfilteredArray);
  // unfilteredArray.sort().filter((a, b) => a !== b );
  // return hashArray.filter(hashMap => compareHash(hashMap, hashArray[0]) === true);
}

const array = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

// anagramGroup(array);
console.log(builder(anagramGroup(array)));
// console.log(compareHash(hashArray[0], hashArray[4]));

// console.log(anagramHash);