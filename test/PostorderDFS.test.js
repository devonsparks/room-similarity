const assert = require('assert');
const {DirectedGraph, Edge} = require('../DirectedGraph')
const PostOrderDFS = require('../PostOrderDFS');

describe('PostorderDFS', function() {

  describe('#constructor(DAG)', function() {
    it('should return the DAG in postorder', function() {
        const g = new DirectedGraph();
        g.addEdge(new Edge('A', 'B'));
        g.addEdge(new Edge('A', 'C'));
        g.addEdge(new Edge('B', 'D'));
        g.addEdge(new Edge('C', 'D'));

        const ordering = new PostOrderDFS(g);
        assert.deepEqual(ordering.traverse().postorder(), ['D', 'B', 'C', 'A']);
    });
});
    describe('#constructor(General)', function() {
        it('should return the general graph in lexigographical postorder', function() {
            const g = new DirectedGraph();
            g.addEdge(new Edge('C', 'B'));
            g.addEdge(new Edge('B', 'A'));
            g.addEdge(new Edge('A', 'C'));
            g.addEdge(new Edge('C', 'F'));
            g.addEdge(new Edge('F', 'E'));
    
            const ordering = new PostOrderDFS(g);

            /* NB. DirectedGraph.vertices() will return vertices 
                   in lexographic order, so 'A' will be the start vertex 
             */
            assert.deepEqual(ordering.traverse().postorder(), ['B','E', 'F', 'C', 'A']);
        });  

    });

    describe('#constructor(General-Multiple)', function() {
        it('should return the general graph in lexigraphical postorder', function() {
            const g = new DirectedGraph();
            g.addEdge(new Edge('C', 'B'));
            g.addEdge(new Edge('B', 'A'));
            g.addEdge(new Edge('A', 'C'));
            //g.addEdge(new Edge('C', 'F'));
            g.addEdge(new Edge('F', 'E'));
    
            const ordering = new PostOrderDFS(g);

      
            assert.deepEqual(ordering.traverse().postorder(), ['B', 'C', 'A', 'E', 'F',]);
        });  

    });
});