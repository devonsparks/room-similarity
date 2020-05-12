const assert = require('assert');
const {DirectedGraph, Edge} = require('../DirectedGraph')
const SCC = require('../SCC');

describe('SCC', function() {

  describe('#components(DAG)', function() {
    it('should return the DAG in postorder', function() {
        const g = new DirectedGraph();
        g.addEdge(new Edge('A', 'B'));
        g.addEdge(new Edge('A', 'C'));
        g.addEdge(new Edge('B', 'D'));
        g.addEdge(new Edge('C', 'D'));

        const ordering = new SCC(g);

        assert.deepEqual(ordering.traverse().components(), 
            new Set([new Set(['A']), new Set(['B']), new Set(['C']), new Set(['D'])]));

    });
});

describe('#components(General)', function() {
    it('should return the general graph in lexigographical postorder', function() {
        const g = new DirectedGraph();
        g.addEdge(new Edge('C', 'B'));
        g.addEdge(new Edge('B', 'A'));
        g.addEdge(new Edge('A', 'C'));
        g.addEdge(new Edge('C', 'F'));
        g.addEdge(new Edge('F', 'E'));

        const ordering = new SCC(g);

        assert.deepEqual(ordering.traverse().components(), 
        new Set([new Set(['A', 'B', 'C']), new Set(['E']), new Set('F')]));

    });  

});

});

