export default class DirectedGraph {
  constructor(){
    this.graph = {}
  }

  addVertex(vertex){
    if(this.graph[vertex]) return
    this.graph[vertex] = []
  }

  hasVertex(vertex){
    return (this.graph[vertex] !== undefined)
  }

  addDirection(start, end, weight){
    if(this.graph[start] === undefined){
      this.graph[start] = []
    }
    if(this.graph[end] === undefined){
      this.graph[end] = []
    }

    const direction = this.graph[start].find(edge => edge.node === end)
    if(direction === undefined){
      this.graph[start].push({node: end, weight})
    } else {
      const index = this.graph[start].indexOf(direction)
      this.graph[start][index].weight = weight
    }
  }

  hasDirection(start, end){
    if(this.graph[start] !== undefined){
      const direction = this.graph[start].find(edge => edge.node === end)
      if(direction !== undefined){
        return true
      }
    }
    return false
  }

  getDirectionWeight(start, end){
    if(this.graph[start] !== undefined){
      const direction = this.graph[start].find(edge => edge.node === end)
      if(direction !== undefined){
        return direction.weight
      }
    }
    return null
  }

  visit(node, callback){
    if(!this.graph[node] || this.graph[node].length === 0) return
    let index = 0
    this.graph[node].forEach(vertex => {
      this.graph[node][index].node = callback(vertex.node)
      index += 1
    })
  }

  removeDirection(vertex1, vertex2){
    const match = this.graph[vertex1].find(vertex => {
      return vertex.node === vertex2
    })
    if(!match) return
    const matchIndex = this.graph[vertex1].indexOf(match)

    this.graph[vertex1].splice(matchIndex, 1)
  }

  getSeparatedVertices(){
    let separatedVertices = []
    let vertices = Object.keys(this.graph)

    vertices.forEach(vertex => {
      if(this.graph[vertex].length === 0){
        let foundEdge = false
        vertices.forEach(node => {
          if(this.graph[node].length > 0) this.graph[node].forEach(edge => {
            if(edge.node === vertex) foundEdge = true
          })
        })
        if(!foundEdge) separatedVertices.push(vertex)
      }
    })
    return separatedVertices
  }

  removeVertex(vertex){
    delete this.graph[vertex]
    const keys = Object.keys(this.graph)

    keys.forEach(key => {
      let edges = this.graph[key]
      if(edges.length > 0){
        const match = edges.find(edge => edge.node === vertex)
        const matchIndex = edges.indexOf(match)
        if(matchIndex !== undefined) this.graph[key].splice(matchIndex, 1)
      }
    })
  }

  count(){
    return Object.keys(this.graph).length
  }

  findShortestPath(startingNode, endingNode){
    const visitedNodes = [startingNode]
    const previousNodes = {}
    const distObj = this.setNodesToInfinity(Object.keys(this.graph))
    distObj[startingNode] = 0
    const startingNeigbors = this.graph[startingNode]
                            .map(node => this.buildNeighborObj(node, startingNode))

    let nodesToVisit = Array.from(startingNeigbors)
    while(nodesToVisit.length > 0) {
      const nodeToVisit = nodesToVisit.pop()
      const nodeName = nodeToVisit.node
      let newDistance = this.computeDistance(nodeToVisit, distObj)
      if(distObj[nodeName] && (distObj[nodeName] >= newDistance)) {
        distObj[nodeName] = newDistance
        if(previousNodes[nodeName]) {
          previousNodes[nodeName].push(nodeToVisit.prev)
        }
        else {
          previousNodes[nodeName] = [nodeToVisit.prev]
        }
      } else {
        distObj[nodeName] = newDistance
      }
      const neighbors = this.graph[nodeName].map(node => this.buildNeighborObj(node, nodeName))
      nodesToVisit = nodesToVisit.concat(neighbors)
    }
    let reconstructedPaths = this.reconstructPaths(startingNode, endingNode, distObj, previousNodes)
    return this.correctReconstructedPaths(reconstructedPaths)
  }

  //Helper methods for findShortestPath
  buildNeighborObj(nodeAndWeight, prevNode){
    return {node: nodeAndWeight.node, prev: prevNode, weight: nodeAndWeight.weight}
  }

  computeDistance(node, distObj){
    return distObj[node.prev] + node.weight
  }

  setNodesToInfinity(nodes){
    let distObj = {}
    nodes.map(node => distObj[node] = Infinity )
    return distObj
  }

  reconstructPaths(startingNode, endingNode, distObj, previousNodes){
    let currentNode = endingNode
    let paths = [currentNode]
    let result;
    if(startingNode === endingNode)
      return [startingNode]

    let nodes = previousNodes[currentNode]
    let pathsTemp = []
    nodes.map(node => {
      pathsTemp = pathsTemp.concat(this.reconstructPaths(startingNode, node, distObj, previousNodes))
    })
    const finalPaths = []
    pathsTemp.map(path => {
      finalPaths.push(paths.concat(path))
    })
    return finalPaths
  }

  correctReconstructedPaths(paths){
    return paths.map(path => path.reverse())
  }

}
