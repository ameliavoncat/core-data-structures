class DirectedGraph {
  constructor(){
    this.vertices = []
    this.directions = []
  }

  addVertex(vertex){
    this.vertices.push(vertex)
  }

  hasVertex(vertex){
    const foundVertex = this.vertices.find(content => content === vertex)
    return (foundVertex !== undefined)
  }

  addDirection(vertex1, vertex2, weight){
    this.directions.push({vertices:{vertex1, vertex2}, weight})
  }

  searchForConnectedVertices(search){
    return this.directions.filter(direction => search === direction.vertices.vertex1)
      .map(direction => direction.vertices.vertex2)
  }

  searchForDirection(search){
    return this.directions.find(direction => JSON.stringify(direction.vertices) === JSON.stringify(search))
  }

  findAllDirections(search){
    return this.directions.filter(direction => {
        if(direction.vertices.vertex1 === search || direction.vertices.vertex2 === search) return direction
    })
  }

  hasDirection(vertex1, vertex2){
    const search = {vertex1, vertex2}
    const match = this.searchForDirection(search)

    return (match !== undefined)
  }

  getDirectionWeight(vertex1, vertex2){
    const search = {vertex1, vertex2}
    const match = this.searchForDirection(search)

    return match.weight
  }

  visit(vertex, callback){
    const vertices = this.searchForConnectedVertices(vertex)

    callback(vertex)
    vertices.forEach(callback)
  }

  findPaths(vertex1, vertex2, lastDirection){
    const vertexDirections = this.findAllDirections(vertex1)
    let paths = []

    vertexDirections.forEach(direction => {
      if(direction.vertices.vertex2 === vertex2) {
        paths.push(direction)
      } else {
        if(JSON.stringify(lastDirection)!==JSON.stringify(direction)){
          let newPath = { direction, path: this.findPaths(direction.vertices.vertex2, vertex2, direction)}
          paths.push(newPath)
        }
      }
    })

    return paths
  }

  findShortestPath(vertex1, vertex2){
    const vertexDirections = this.findAllDirections(vertex1)
    let paths = this.findPaths(vertex1, vertex2, null)
    let shortestPathDirection
    let shortestPathWeight

    paths.forEach(path => {
      if(path.weight){
        if(typeof shortestPathWeight === 'number'){
          if(path.weight < shortestPathWeight) {
            shortestPathDirection = path.vertices
            shortestPathWeight = path.weight
          }
        } else if(path.weight === shortestPathWeight){
          shortestPathDirection = [shortestPathDirection, path.vertices]
        }  else {
          shortestPathDirection = path.vertices
          shortestPathWeight = path.weight
        }
      } else {
        let pathWeight = path.direction.weight
        let pathString = path.direction.vertices
        path.path.forEach( path2 =>{
          pathString = pathString + '->' + path2.vertices
          pathWeight += path2.weight
        })
        if(pathWeight < shortestPathWeight){
          shortestPathDirection = pathString
          shortestPathWeight = path.direction.weight
        } else if(path.direction.weight === shortestPathWeight){
          shortestPathDirection = [shortestPathDirection, path.vertices]
        }
      }
    })

    return shortestPathDirection
  }

  removeDirection(vertex1, vertex2){
    const search = {vertex1, vertex2}
    const match = this.searchForDirection(search)
    const matchIndex = this.directions.findIndex(direction => match === direction)

    return this.directions.splice(matchIndex, 1)
  }

  getSeparatedVertices(){
    return this.vertices.filter(vertex => {
      let connections = this.searchForConnectedVertices(vertex)
      if (connections.length === 0) return vertex
    })
  }

  removeVertex(vertex){
    const vertexDirections = this.findAllDirections(vertex)
    const vertexIndex = this.vertices.indexOf(vertex => vertex === vertex)

    vertexDirections.forEach(direction => this.removeDirection(direction.vertices))
    this.vertices.splice(vertexIndex, 1)
  }

  count(){
    return this.vertices.length
  }
}

const diGraph = new DirectedGraph()

diGraph.addVertex('v1')
// console.log(diGraph.vertices)             // adds a vertex to the graph.
// console.log(diGraph.hasVertex('v1'))
diGraph.addDirection('v1', 'v3', 4)              // returns true if the graph contains the vertex or false if not.
diGraph.addDirection('v1', 'v2', 2)
diGraph.addDirection('v2', 'v3', 2)  // adds a direction from 'v1' to 'v2' with a weight (number).
// console.log(diGraph.hasDirection('v1', 'v2'))      // returns true if there's a direction from 'v1' to 'v2'.
// console.log(diGraph.getDirectionWeight('v1', 'v2')) // returns direction weight between v1 & v2 or null if no direction exists.
// diGraph.visit( 'v1', vertex => console.log(vertex)) // visit all the connected vertices in the graph starting with v1 and apply function on the reached vertex.
console.log(diGraph.findShortestPath('v1', 'v3'))  // returns an array of all the shortest paths between two vertices based on the sum of weights.
// diGraph.removeDirection('v1', 'v2')
