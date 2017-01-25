'use strict'

class Node {
  constructor(data, next, prev) {
    this.data = data
    this.next = next
    this.prev = prev
  }
}

class Stack {
  constructor() {
    this.head = null 
    this.top = null
  }

  push(value) {
    if(this.head == null){
      this.head = new Node(value)
      this.top = this.head
      return this
    }
    let addedNode = new Node(value)
    addedNode.prev = this.top
    this.top.next = addedNode
    this.top = addedNode
    return this
  }

  pop() {
    if(this.head == null) {
      return null
    } 
    let currentTop = this.top
    this.top = this.top.prev
    this.top.next = null
    return currentTop
  }

  length() {
    let currentNode = this.head
    let count = 0
    while(currentNode){
      currentNode = currentNode.next
      count++
    }
    return count
  }

  isEmpty() {
    return (this.head == null) ? true : false
  }

  peek() {
    if(this.head == null) {
      return null
    }
    let currentTop = this.top
    return currentTop.data
  }

}

export default Stack