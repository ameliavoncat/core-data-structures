'use strict'

export default class Stack {
  constructor(){
    this.stack = []
  }

  push(newOne){
    this.stack.push(newOne)
  }

  pop(){
    let newStack = []
    let lastIndex = this.stack.length - 1
    const result = this.stack[lastIndex]

    for(let i=0; i<lastIndex; i++) newStack.push(this.stack[i])
    this.stack = newStack

    return result
  }

  peek(){
    let lastIndex = this.stack.length - 1

    return this.stack[lastIndex]
  }

  isEmpty(){
    return (this.stack.length === 0)
  }

  length(){
    return this.stack.length
  }
}
