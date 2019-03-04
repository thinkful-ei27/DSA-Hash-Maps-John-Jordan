'use strict';

const HashMap = require('./hashMap');
const anagramHash = new HashMap();

function compareHash(hash1, hash2) {
  return (hash1._slots.join('') == hash2._slots.join(''));
}

const hashArray = [];
function anagramGroup(arr) {
  arr.map(word => {
    // split word to push letter into hash map
    const splitWord = word.split('');
    const hash = new HashMap();
    splitWord.forEach(letter => hash.set(letter, word));
    hashArray.push(hash);
  });
  hashArray.reduce((final, cv) => {
    // CV = hashmap of the current value (aka, east)
    // Final is what we will build at the end
    
  }, []);
  return hashArray;
}

const array = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];

anagramGroup(array);

console.log(compareHash(hashArray[0], hashArray[4]));

// console.log(anagramHash);