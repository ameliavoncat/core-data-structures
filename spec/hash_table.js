import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import HashTable from '../src/hash_table'

chai.use(chaiChange)

let ht

describe('HashTable', () => {
  beforeEach(() => {
    ht = new HashTable()
  })

  it('exists', () => {
    expect(HashTable).to.be.a('function')
  })

  describe('put(key, value)', () => {
    it('adds a key value pair to the hash table', () => {
      ht.put('asuh','dude')
      expect(ht.get('asuh')).to.deep.equal('dude')
    })
  })

  describe('get(key)', () => {
    it('gets the value from the hash table with the given key', () => {
      ht.put('asuh','dude')
      expect(ht.get('asuh')).to.deep.equal('dude')
    })
  })

  describe('contains(key)', () => {
    it('returns true if there is a value associated with the input key', () => {
      ht.put('asuh','dude')
      expect(ht.contains('asuh')).to.equal(true)
    })
  })

  describe('iterate(callback)', () => {
    it('executes a callback function on each key value pair in the hash table', () => {
      ht.put('asuh','dude')
      ht.put('hey','bro')
      ht.put('waddup','playa')
      ht.put('how', 'sway')

      let keys = []
      let values = []

      ht.iterate( (key,value) => { keys.push(key); values.push(value)} )
      //checks to see if each key will return the matching value that was pushed in the iterate callback
      expect(keys.every( element => { return values.indexOf(ht.get(element)) >= 0 } ) ).to.equal(true)
    })
  })

  describe('remove(key)', () => {
    it('removes key value pair of the given key from the hash table', () => {
      ht.put('asuh','dude')
      ht.put('hey','bro')
      ht.put('waddup','playa')
      ht.put('how', 'sway')
      ht.remove('hey')
      expect(ht.contains('hey')).to.equal(false)
    })
  })

  describe('size()', () => {
    it('returns the size of the hash table', () => {
      ht.put('asuh','dude')
      ht.put('hey','bro')
      ht.put('waddup','playa')
      ht.put('how', 'sway')
      expect(ht.size()).to.deep.equal(4)
    })
  })

  describe('hash(key)', () => {
    it('takes the key and runs it through a hash function', () => {
      expect(HashTable.hash('adam')).to.deep.equal(403) // manually calculated hash result
    })
  })
})