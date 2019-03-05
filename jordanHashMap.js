'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(item) {
    const index = this._findSlot(item.split('').sort().join(''));
    if (!this._slots[index]) {
      this._slots[index] = [item];
    } else {
      this._slots[index].push(item);
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;
    return start;
    // for (let i = start; i < start + this._capacity; i++) {
    //   const index = i % this._capacity;
    //   const slot = this._slots[index];
    //   if (slot === undefined || (slot.key == key && !slot.deleted)) {
    //     return index;
    //   }
    // }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  display() {
    return this._slots.filter(item => !!item);
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

// Create a hash map call lor and add the following
let lor = new HashMap();
const chars = [
  { Hobbit: 'Bilbo' },
  { Hobbit: 'Frodo' },
  { Wizard: 'Gandalf' },
  { Human: 'Aragon' },
  { Elf: 'Legolas' },
  { Maiar: 'The Necromancer' },
  { Maiar: 'Sauron' },
  { RingBearer: 'Gollum' },
  { LadyOfLight: 'Galadriel' },
  { HalfElven: 'Arwen' },
  { Ent: 'Treebeard' },
];
chars.map(char => {
  const entry = Object.entries(char);
  return lor.set(entry[0][0], entry[0][1]);
});

// Retrieve the value that is hashed in the key Maiar
// console.log(lor.get('Maiar'));
// console.log(lor);

function main() {

  console.log(HashMap._hashString(alphebatize('acre')));
  console.log(HashMap._hashString(alphebatize('race')));
}

function alphebatize(str) {
  return str.split('').sort().join('');
}

// main();

module.exports = HashMap;