'use strict'

export default class Stack {
  constructor(){
    this.stack = []
  }

  stackPush(newOne){
    this.stack.push(newOne)
  }

  stackPop(){
    let newStack = []
    let lastIndex = this.stack.length - 1
    const result = this.stack[lastIndex]

    for(let i=0; i<lastIndex; i++) newStack.push(this.stack[i])
    this.stack = newStack

    return result
  }

  stackPeek(){
    let lastIndex = this.stack.length - 1

    return this.stack[lastIndex]
  }

  isEmpty(){
    return (this.stack.length === 0)
  }

  getLength(){
    return this.stack.length
  }
}
