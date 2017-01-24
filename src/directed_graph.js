export default class DirectedGraph {
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

    let shortestPath = {
      direction: null,
      weight: null
    }

    paths.forEach(path => {
      console.log('this is our path!', path)
      if(path.weight){
        if(typeof shortestPath.weight === 'number'){
          if(path.weight < shortestPath.weight) {
            shortestPath.direction = [path.vertices]
            shortestPath.weight = path.weight
          } else if(path.weight === shortestPath.weight){
            shortestPath.direction = [shortestPath.direction, path.vertices]
          }
        } else {
          shortestPath.direction = [path.vertices]
          shortestPath.weight = path.weight
        }
      } else {
        let pathWeight = path.direction.weight
        let pathString = [path.direction.vertices]
        path.path.forEach( path2 => {
          pathString.push(path2.vertices)
          pathWeight += path2.weight
        })
        if(typeof shortestPath.weight === 'number'){
          if(pathWeight < shortestPath.weight){
            shortestPath.direction = pathString
            shortestPath.weight = pathWeight
          } else if(pathWeight === shortestPath.weight){
            shortestPath.direction = [shortestPath.direction, pathString]
          }
        } else {
          shortestPath.direction = pathString
          shortestPath.weight = pathWeight
        }
      }
    })
    
    return shortestPath.direction
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
