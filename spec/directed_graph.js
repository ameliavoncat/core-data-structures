import chai, { expect } from 'chai'
import DirectedGraph from '../src/directed_graph'

let dirGraph

describe('DirectedGraph', () => {
  beforeEach(() => {
    dirGraph = new DirectedGraph()
  })

  context('addVertex', () => {
    it('adds a vertex to the graph', () => {
      dirGraph.addVertex('v1')
      expect(dirGraph.graph).to.eql({ v1:[] })
    })
  })

  context('hasVertex', () => {
    it('returns true if the graph contains the vertex', () => {
      dirGraph.addVertex('v1')

      expect(dirGraph.hasVertex('v1')).to.eql(true)
    })
    it('returns false if the graph does not contain the vertex', () => {
      expect(dirGraph.hasVertex('v1')).to.eql(false)
    })
  })

  context('addDirection', () => {
    it('adds a direction to the graph', () => {
      dirGraph.addDirection('v1', 'v2', 3)

      expect(dirGraph.graph).to.eql(
        {
          v1: [ { node: 'v2', weight: 3 } ],
          v2: []
        }
      )
    })
    it('updates the weight if the direction already exists', () => {
      dirGraph.addDirection('v1', 'v2', 3)
      dirGraph.addDirection('v1', 'v2', 5)

      expect(dirGraph.graph).to.eql(
        {
          v1: [ { node: 'v2', weight: 5 } ],
          v2: [ ]
        }
      )
    })
  })

  context('hasDirection', () => {
    it('returns false if the direction does not exist', () => {
      expect(dirGraph.hasDirection('v1', 'v2')).to.eql(false)
    })
    it('returns true if the direction exists', () => {
      dirGraph.addDirection('v1', 'v2', 3)

      expect(dirGraph.hasDirection('v1', 'v2')).to.eql(true)
    })
  })


  context('getDirectionWeight', () => {
    it('returns null if no direction exists', () => {
      expect(dirGraph.getDirectionWeight('v1', 'v2')).to.eql(null)
    })
    it('returns the direction weight', () => {
      dirGraph.addDirection('v1', 'v2', 3)

      expect(dirGraph.getDirectionWeight('v1', 'v2')).to.eql(3)
    })
  })

  context('visit', () => {
    it('visits the connected vertices and applies the function on each', () => {
      dirGraph.addDirection(1, 2, 3)
      dirGraph.addDirection(1, 3, 2)
      dirGraph.visit(1, (a) => a + 3 )

      expect(dirGraph.graph[1]).to.eql([{node: 5, weight: 3}, {node: 6, weight: 2}])
    })
  })

  context('removeDirection', () => {
    it('removes an existing direction between vertices', () => {
      dirGraph.addDirection('v1', 'v2', 3)

      dirGraph.removeDirection('v1', 'v2')
      expect(dirGraph.graph['v1']).to.eql([])
    })
  })

  context('getSeparatedVertices', () => {
    it('returns an array of all vertices not connected to other nodes', () => {
      dirGraph.addVertex('v1')
      dirGraph.addDirection('v1', 'v2', 3)
      dirGraph.addVertex('v3')

      expect(dirGraph.getSeparatedVertices()).to.eql(['v3'])
    })
  })

  context('removeVertex', () => {
    it('removes a vertex and all directions', () => {
      dirGraph.addDirection('v3', 'v1', 2)
      dirGraph.addDirection('v3', 'v2', 2)
      dirGraph.addDirection('v1', 'v2', 3)
      dirGraph.removeVertex('v1')

      expect(dirGraph.graph).to.eql({v3: [{node: 'v2', weight: 2}], v2: []})
    })
  })

  context('count', () => {
    it('returns the number of vertices in the graph', () => {
      dirGraph.addVertex('v1')
      dirGraph.addDirection('v2' , 'v3', 1)

      expect(dirGraph.count()).to.eql(3)
    })
  })

  context('findShortestPath', () => {
    it('returns an array of the shortest paths between vertices', () => {
      dirGraph.addDirection('v1', 'v2', 1)
      dirGraph.addDirection('v2', 'v3', 1)
      dirGraph.addDirection('v1', 'v3', 2)

      expect(dirGraph.findShortestPath('v1', 'v3')).to.eql([ ['v1', 'v3'], ['v1', 'v2', 'v3'] ])
    })
  })
})
