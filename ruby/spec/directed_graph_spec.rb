require_relative('../src/directed_graph')

RSpec.describe DirectedGraph, "Methods" do
  before(:each) do
    @diGraph = DirectedGraph.new
  end

  context "addVertex" do
    it "adds a vertex to the graph" do
      @diGraph.addVertex('v1')
      expect(@diGraph.vertices).to eq ['v1']
    end
  end

  context "hasVertex" do
    it "returns false if the graph does not contain the vertex" do
      expect(@diGraph.hasVertex('v1')).to eq false
    end
    it "returns true if the graph contains the vertex" do
      @diGraph.addVertex('v1')
      expect(@diGraph.hasVertex('v1')).to eq true
    end
  end

  context "addDirection" do
    it "adds a direction to the graph" do
      @diGraph.addDirection('v1', 'v2', 1)
      expect(@diGraph.directions).to eq [{
        vertices: {
          vertex1: 'v1',
          vertex2: 'v2'
        },
        weight: 1
      }]
    end
  end

  context "hasDirection" do
    it "returns false if there is no direction between two vertices" do
      expect(@diGraph.hasDirection('v1', 'v2')).to eq false
    end
    it "returns true if there is a direction between two vertices" do
      @diGraph.addDirection('v1', 'v2', 1)
      expect(@diGraph.hasDirection('v1', 'v2')).to eq true
    end
  end

  context "getDirectionWeight" do
    it "returns the direction weight if the direction exists" do
      @diGraph.addDirection('v1', 'v2', 1)
      expect(@diGraph.getDirectionWeight('v1', 'v2')).to eq 1
    end
    it "returns nil if the direction does not exist" do
      expect(@diGraph.getDirectionWeight('v1', 'v2')).to eq nil
    end
  end

  context "visit" do
    it "performs the callback on all vertices that share a direction with the vertex" do
      @diGraph.addDirection('v1', 'v2', 1)

      def callback(vertex)
        vertex = vertex + ' copy'
        return vertex
      end

      @diGraph.visit('v1') {|nextVertex| callback(nextVertex)}
      expect(@diGraph.vertices).to include('v2 copy')
    end
  end

  context "findShortestPath" do
    it "returns an array of the shortest paths between vertices" do
      @diGraph.addDirection('v1', 'v3', 2)
      # @diGraph.addDirection('v1', 'v2', 2)
      # @diGraph.addDirection('v2', 'v3', 1)

      puts(@diGraph.findShortestPath('v1', 'v3'))
    end

  end
end
