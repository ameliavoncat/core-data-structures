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
    let paths = this.findPaths(vertex1, vertex2, null)

    let shortestPath = {
      direction: null,
      weight: null
    }

    const checkSubPaths = (path, currentWeight) => {
      let pathString = []
      let pathWeight = currentWeight
      if(path.path){
        path.path.forEach( path2 => {
          pathWeight += path2.weight
          const subPaths = checkSubPaths(path2, pathWeight)
          pathString.push(path2.vertices, subPaths)
        })
      }
      return pathString
    }

    paths.forEach(path => {
      if(path.weight){
        console.log('path.weight', path.weight)
        if(typeof shortestPath.weight === 'number'){
          if(path.weight < shortestPath.weight) {
            shortestPath.direction = [path.vertices]
            shortestPath.weight = path.weight
          } else if(path.weight === shortestPath.weight){
            shortestPath.direction = [shortestPath.direction, path.vertices]
            shortestPath.weight = path.weight
          }
        } else {
          console.log('shortestPath.weight is not a number', path.weight)
          shortestPath.direction = [path.vertices]
          shortestPath.weight = path.weight
        }
      } else {
        console.log('else', path.direction)
        let pathWeight = path.direction.weight
        let pathString = [path.direction.vertices]
        path.path.forEach( path2 => {
          if(path2.path){
            pathString.push(path2.vertices, checkSubPaths(path2))
          }
          console.log('path2',path2)
          pathString.push(path2.vertices)
          pathWeight += path2.weight
        })
        if(typeof shortestPath.weight === 'number'){
          console.log('shortestPAth.weight', shortestPath.weight)
          if(pathWeight < shortestPath.weight){
            shortestPath.direction = pathString
            shortestPath.weight = pathWeight
            console.log('pathWeight< shortestPath.weight', shortestPath.weight)
          } else if(pathWeight === shortestPath.weight){
            console.log('Got into if statement!!!')
            shortestPath.direction = [shortestPath.direction, pathString]
            shortestPath.weight = pathWeight
          }
        } else {
          console.log('no weight + long path', pathString, pathWeight)
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