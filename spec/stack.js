import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import Stack from '../src/stack'

chai.use(chaiChange)
  let stack

describe('Stack', function () {
  beforeEach(function(){
    stack = new Stack()
  }) 

  it('exists', function () {
    expect(Stack).to.be.a('function')
  })

  describe('push()', function () {
    it('exists', function () {
      expect(stack.push).to.be.a( 'function' )
    })

    it('increases the stack size', function () {
      stack.push(10)
      stack.push(11)
      stack.push(12)

      expect(stack.length()).to.equal(3)
    })
  })

  // describe('contents()', function () {
  //   it('returns the value of the stack in an array', function () {
  //     stack.push(10)
  //     stack.push(11)
  //     stack.push(12)

  //     expect(stack.contents()).to.equal([10, 11, 12])
  //   })
  // })


  describe('pop()', function () {
    it('exists', function () {
      expect(stack.pop).to.be.a( 'function' )
    })

    context('when the stack is empty', function () {
      it('does not change the stack size', function () {
        expect(stack.length()).to.equal( 0 )
      })

      it('returns null', function () {
        expect(stack.pop()).to.be.null
      })
    })

    describe('when the stack is not empty', function () {
      beforeEach(function () {
        stack.push( 'foo' )
        stack.push( 'bar' )
        stack.push( 'bar' )
      })

      it('decreases the stack size by one', function () {
        expect(stack.pop()).to.satisfy( () => {
          return stack.length() === 2
        })
      })
    })
  })

  describe('isEmpty()', function () {
    it('exists', function () {
      expect(stack.isEmpty).to.be.a('function')
    })

    it('returns true when the stack is empty', function () {
      expect(stack.isEmpty()).to.be.true
    })

    it('returns false when the stack is not empty', function () {
      stack.push( 'foo' )

      expect(stack.isEmpty()).to.be.false
    })
  })

  describe('length()', function () {
    it('exists', function () {
      expect(stack.length).to.be.a('function')
    })

    it('returns the number of elements in the stack', function () {
      expect(stack.length()).to.equal( 0 )

      stack.push( 'foo' )
      expect(stack.length()).to.equal( 1 )

      stack.push( 'bar' )
      expect(stack.length()).to.equal( 2 )

      stack.pop()
      expect(stack.length()).to.equal( 1 )

      stack.push( 'baz' )
      expect(stack.length()).to.equal( 2 )
    })
  })

  describe('peek()', function () {
    it('exists', function () {
      expect(stack.peek).to.be.a('function')
    })

    it('returns null when the stack is empty', function () {
      expect(stack.peek()).to.be.null
    })

    it('returns the last push()ed element when the stack is not empty', function () {
      stack.push( 'foo' )

      expect(stack.peek()).to.equal( 'foo' )
    })
  })
})