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

  insertBefore( data, newData ) {
     let node = new Node( newData )
     let currentNode = this.head
     let previous

     while( currentNode.next ) {
       if( currentNode.data === data ){
         node.next = currentNode
         currentNode.previous = node
       }
       currentNode = currentNode.next
     }
      return node
   }


  insertAfter( data, newData ) {
    let node = new Node( newData )
    let currentNode = this.head

    while( currentNode.next ) {
      if( currentNode.data === data ){
        node.next = currentNode.next
        currentNode.next = node
        return node
      }
      currentNode = currentNode.next
    }
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

const llist = new LinkedList()
llist.insert('claire')
llist.insert('santos')
llist.insertAfter('claire', 'aileen')
console.log(llist)

// export default LinkedList