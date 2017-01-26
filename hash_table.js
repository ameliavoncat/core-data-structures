class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  addNode(key, val){
    const node = new Node(key, val)
    node.next = this.head
    this.head = node
  }

  findNode(key) {
    let top = this.head
    while(top != null) {
      //console.log('top.key::', top.key, key)
      if(top.key === key) {
        //console.log('entered if block')
        return top
      }
      top = top.next
    }
    return top
  }

  updateNode(key, value) {
    let node = this.findNode(key)
    node.value = value
  }

  findKey(key) {
    const found = this.findNode(key)
    if(found)
      return found.value
    return null
  }
}

class HashTable {
  constructor() {
    this.storage = []
  }

  //classic hash method
  // division method: h(k) = k % m
  // other methods: multiplication method: h(k) = [(a * k) % 2 Wpower] shift right (w - r)
  // w is the number of bits
  // r is the number of bits you deduct from w 
  // universal hashing: h(k) = [(ak+b) % prime num] % m
  // a, b are random numbers, m are the numbers of slots in the associative array


  computeHash(val){
    let charArray = val.toString().split('')
    const totalSum = charArray.reduce((sum, char) => {
      return sum + char.charCodeAt(0)
    }, 0)
    return totalSum % 1024
  }

  put(key, val) {
    let index = this.computeHash(key)
    //console.log('index', index)
    //console.log('put index:', index)
    let bucket = this.storage[index]
    if(bucket) {
      const valInLinkedList = bucket.findKey(key)
      if(!valInLinkedList){
        bucket.addNode(key, val)     
      } else {
        // update the node in the linked list
        // todo this is inefficient, since I am finding the node twice
        bucket.updateNode(key, val)
      }
    } else {
      this.storage[index] = new LinkedList()
      let bucket = this.storage[index]
      bucket.addNode(key, val)
    }
    return this
  }

  get(key) {
    let index = this.computeHash(key)
    console.log('get index:', index)
    let bucket = this.storage[index]
    if(bucket) {
      //console.log('get bucket::', bucket)
      return bucket.findKey(key)
    }
    return null
  }

  // contains(key) {

  // }

  // iterate(key, val) {

  // }

  // size() {

  // }

  // remove() {

  // }
  
}

// let ht = new HashTable()
// console.log(ht.computeHash('aileen'))

// console.log('ht:', ht)
// console.log('get:: ', ht.get('aileen'))
// console.log('get:: ', ht.get('aileen12'))
// console.log('get:: ', ht.get('aileen5'))
// ht.put('aileen', 'super cool')
// console.log('get:: ', ht.get('aileen'))

export { LinkedList, HashTable }
