import chai, { expect } from 'chai'
import chaiChange from 'chai-change'
import DirectedGraph from '../src/directed_graph'

chai.use(chaiChange)
  let diGraph

describe('DirectedGraph', function() {
  beforeEach(function() {
    diGraph = new DirectedGraph()
  })

  it('exists', function() {
    expect(DirectedGraph).to.be.a('function')
  })

  context('addVertex()', function() {
    it('adds a vertex to a graph', function() {
      diGraph.addVertex('vertexA')
      diGraph.addVertex('vertexB')
      diGraph.addVertex('vertexC')

      expect(diGraph.vertices).to.eql(['vertexA', 'vertexB', 'vertexC'])
    })
  })

    context('hasVertex', function() {
      it('returns true if the graph contains a vertex or false if it does not', function() {
        diGraph.addVertex('vertexA')

        expect(diGraph.hasVertex('vertexA')).to.eql(true)      
        expect(diGraph.hasVertex('vertexB')).to.eql(false)      
      })
    })

    context('addDirection', function() {
      it("adds a direction from 'v1' to 'v2' with a weight (number)", function() {
        diGraph.addDirection('vertexA', 'vertexB', 3)

        expect(diGraph.directions).to.eql([{vertices: {vertex1: 'vertexA', vertex2: 'vertexB'}, weight: 3}])
      })
    })

    context('hasDirection', function() {
      it("returns true if there's a direction from 'v1' to 'v2'", function() {
        diGraph.addDirection('vertexA', 'vertexB', 3)

        expect(diGraph.hasDirection('vertexA', 'vertexB')).to.eql(true)
      })
    })

    context('getDirectionWeight', function() {
      it('returns direction weight between v1 & v2 or null if no direction exists', function() {
        diGraph.addDirection('vertexA', 'vertexB', 3)
        diGraph.addDirection('vertexC', 'vertexD', null)

        expect(diGraph.getDirectionWeight('vertexA', 'vertexB')).to.eql(3)
        expect(diGraph.getDirectionWeight('vertexC', 'vertexD')).to.eql(null)
      })
    })

    context('visit', function() {
      it('visit all the connected vertices in the graph starting with v1 and apply function on the reached vertex', function() {
        diGraph.addDirection('vertexA', 'vertexB', 3)
        diGraph.visit('vertexA', (vertex) => diGraph.addVertex(vertex + ' copy'))

        expect(diGraph.vertices).to.include('vertexB copy')
      })
    })

    context('findShortestPath', function() {
      it('returns an array of all the shortest paths between two vertices based on the sum of weights', function() {
        diGraph.addDirection('vertexA', 'vertexB', 3)
        diGraph.addDirection('vertexB', 'vertexC', 2)
        diGraph.addDirection('vertexA', 'vertexC', 4)

        expect(diGraph.findShortestPath('vertexA', 'vertexC')).to.eql([{vertex1: 'vertexA', vertex2: 'vertexC'}])
      })

      it('returns a multi-direction array when the shortest path takes multiple directions', function() {
        diGraph.addDirection('vertexA', 'vertexB', 1)
        diGraph.addDirection('vertexB', 'vertexC', 2)
        diGraph.addDirection('vertexA', 'vertexC', 4)

        expect(diGraph.findShortestPath('vertexA', 'vertexC')).to.eql([{vertex1: 'vertexA', vertex2: 'vertexB'}, {vertex1: 'vertexB', vertex2: 'vertexC'}])
      })
    })
})