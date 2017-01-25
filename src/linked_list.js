'use strict'

class Node {
  constructor(data, next) {
    this.data = data
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this._length = 0
    this.head = null
  }

  insert(value) {
    let node = new Node(value)
    //case 1, no value, throw error
    if(!value){
      throw new Error('Please pass in a value')
    }
    //case 2 no head, make the new node the new head 
    if(!this.head) {
      this.head = node
      this._length++

      return node
    }
    //case 3, head exists,  
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }
    currentNode.next = node
    this._length++
    return node
  }

  insertFirst(value) {
    let node = new Node(value)
    //case 1, no head, make the new node the new head
    if(!this.head) {
      this.head = node
      this._length++

      return node
    }
    //case 2, head exists
    let currentNode = this.head
    node.next = currentNode
    this.head = node

    return node
  }

  insertBefore(val, newVal) {
    let node = new Node(value)
  }

  // insertAfter(value) {

  // }
  
  getHeadNode() {
    return this.head
  }

  getTailNode() {
    let currentNode = this.head
    while(currentNode.next) {
      currentNode = currentNode.next
    }
    return currentNode
  }
}

// const llist = new LinkedList()
// llist.insert('aileen')
// llist.insert('claire')
// llist.insert('lagunzad')
// llist.insert('santos')
// console.log(llist.getTailNode())

export default LinkedList