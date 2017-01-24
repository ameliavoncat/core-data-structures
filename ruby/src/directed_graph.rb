class DirectedGraph
  attr_reader :vertices
  attr_reader :directions

  def initialize
    @vertices = []
    @directions = []
  end

  def addVertex(vertex)
    @vertices.push(vertex)
  end

  def hasVertex(vertex)
    foundVertex = @vertices.find {|found| found === vertex }
    return (foundVertex != nil)
  end

  def addDirection(vertex1, vertex2, weight)
    @directions.push({vertices: { vertex1: vertex1, vertex2: vertex2 }, weight: weight})
  end

  def hasDirection(vertex1, vertex2)
    foundDirection = @directions.find {|direction| direction[:vertices] === { vertex1: vertex1, vertex2: vertex2 } }
    return (foundDirection != nil)
  end

  def getDirectionWeight(vertex1, vertex2)
    foundDirection = @directions.find {|direction| direction[:vertices] === { vertex1: vertex1, vertex2: vertex2 } }

    if(foundDirection === nil)
      return nil
    end

    return foundDirection[:weight]
  end

  def visit(vertex, &block)
    callback = block
    newVertices = []


    connectedVertices = @directions.find_all {|direction| direction[:vertices][:vertex1] === vertex}
    connectedVertices.each do |item|
      mutation = callback.call(item[:vertices][:vertex2])
      newVertices.push(mutation)
    end
    @vertices = newVertices
  end

  def findShortestPath(vertex1, vertex2)
    @start = vertex1
    @destination = vertex2
    @paths = []

    accumulator = [@start]

    def callback(vertex, acc)
      newAccumulator = acc
      if(newAccumulator[newAccumulator.length-1] === vertex)
        newAccumulator=[@start]
      end
      if(vertex === @destination)
        newAccumulator.push(vertex)
        @paths.push(newAccumulator)
      else
        newAccumulator.push(vertex)
        self.visit(vertex) {|nextVertex| callback(nextVertex, newAccumulator)}
      end
    end

    self.visit(vertex1) {|nextVertex| callback(nextVertex, accumulator)}
    return @paths
  end

end
