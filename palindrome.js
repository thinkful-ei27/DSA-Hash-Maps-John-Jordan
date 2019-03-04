'use strict';

const HashMap = require('./hashMap');
const palindromeHash = new HashMap();

// Is it possible to re-arrange these letters to make a palindrome?
// palindromeHash.set('north');
// palindromeHash.set('ornth');

function simpleCheckForFalse(str) {
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  const strSplit = str.split('');
  for (let i = 0; i < strSplit.length; i++) {
    palindromeHash.set(strSplit[i], i);
  }
  let filteredHash = (palindromeHash._slots.filter(item => item !== null));
  if (filteredHash.length - (palindromeHash.length - filteredHash.length) > 2) {
    return false;
  }
  return true;
}

console.log(simpleCheckForFalse('a man, a plan, a canal: panama'));