'use strict';

class _Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.deleted = false;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  } 
  insertFirst(item) {
    this.head = new _Node(item.key, item.value, this.head);
  }
  insertLast(item) {
    if (this.head === null) {
      this.insertFirst(item);
    } else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next;
      }
      tempNode.next = new _Node(item.key, item.value, null);
    }
  }
}

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

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }

    const index = this._findSlot(key);
    // Change every index into a linked list
    console.log(this._slots.length);
    if (this._slots.length === 0) {
      console.log('length 0');
      const ll = new LinkedList();
      ll.insertLast({key, value});
      this._slots[index] = ll;
    } else if (!this._slots[index]) {
      console.log('index was undef');
      const ll = new LinkedList();
      ll.insertLast({key, value});
      this._slots[index] = ll;
    } 
    else {
      console.log('adding to the list');
      this._slots[index].insertLast({key, value});
    }
    this.length++;
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

  static _hashString(string) {
    let total = 0;
    for (let i = 0; i < string.length; i++) {
      total += string.charCodeAt(i);
    }
    return total % 2;
  }
}

// const ll = new LinkedList();
// ll.insertLast('luke');
// ll.insertLast('han');
// console.log(ll);

const hash = new HashMap();
hash.set('key1', 'luke');
// hash.set('key2', 'han');
hash.set('key34', 'leiaa');
hash.set('key35', 'leiaa');
console.log(JSON.stringify(hash));