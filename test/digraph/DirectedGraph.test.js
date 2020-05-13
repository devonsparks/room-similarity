const assert = require('assert');
const {DirectedGraph, Edge} = require('../../digraph/DirectedGraph')

describe('DirectedGraph', function() {

    beforeEach(function () {
        this.g = new DirectedGraph();
        this.g.addEdge(new Edge('A', 'B'));
        this.g.addEdge(new Edge('A', 'C'));
        this.g.addEdge(new Edge('B', 'D'));
        this.g.addEdge(new Edge('C', 'D'));
    });

  describe('#vertices()', function() {
    it('should only return vertices that have been added', function() {
       assert.deepEqual(Array.from(this.g.vertices()), ['A', 'B', 'C', 'D']);
    });

});
    describe('#neighbors()', function() {
        it('should only return vertex successors', function() {
           assert.deepEqual(Array.from(this.g.neighbors('A')), ['B', 'C']);
        });
    });

    describe('#reverse()', function() {
        it('should reverse all the edges of the original graph', function() {
           const r = this.g.reverse();
           assert.deepEqual(Array.from(r.neighbors('D')), ['B', 'C']);
           assert.deepEqual(Array.from(r.neighbors('B')), ['A']);
           assert.deepEqual(Array.from(r.neighbors('B')), ['A']);
           assert.deepEqual(Array.from(r.neighbors('A')), []);
        });
    });

});