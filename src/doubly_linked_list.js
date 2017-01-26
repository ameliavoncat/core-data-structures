class Node {
  constructor(data, prev, next) {
  this.data = data
  this.next = next
  this.prev = prev
  }
}

const DoublyLinkedList = class {
  constructor() {
    this._length = 0
    this.head = null
    this.tail = null
  }

 getHeadNode() { return this.head.data }

  getTailNode() {
    let currentNode = this.head
    while( currentNode.next ) {
      currentNode = currentNode.next
    }
    return currentNode.data
  }

  insert(data) {
    let node = new Node(data) 

    if(this._length) {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    } else {
      this.head = node
      this.tail = node
    }
    this._length++
    return node
  }

  // insertFirst(value) {
  //   let insertedNode = 
  //   this.head = 
  // }

  // insertBefore(value) {

  // }

  // insertAfter(value) {

  // }

  // find() {

  // }
  
  find(position) {
    let currentNode = this.head
    let length = this._length
    let count = 1

    if(length === 0 || position < 1 || position > length) {
      throw new Error("This node position does not exist in this list.")
    }

    while(count < position) {
      currentNode = currentNode.next
      count++
    }
    return currentNode.data
  }

  remove() {
    let currentNode = this.head
    let nodeToDelete = this.getTailNode()

    while(currentNode.next) {
      if(currentNode.next === nodeToDelete){
        currentNode.next = null
        this._length--
        break
      }
    } 
    currentNode = currentNode.next   
  }

  removeFirst() {
    let currentNode = this.head

    this.head = currentNode.next
    this._length--
  }

  isEmpty() {
    return this._length === 0
  }

  size() {
    return this._length
  }

  clear() {
    this._length = 0
    this.head = null
  }

}

// const dll = new DoublyLinkedList()
// dll.insert(10)
// dll.insert(11)
// dll.insert(12)
// console.log(dll.getTailNode())


export default DoublyLinkedList