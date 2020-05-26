/*
const assert = require('assert');
const Path = require('../../geometry/Path');
const CartesianPoint = require('../../geometry/CartesianPoint');

describe('Path', function () {

    describe('#lineto', function () {
        it('should have complementary next and last pointers', function () {
            const p0 = new Path(new CartesianPoint(0, 0))
            const p1 = p0.lineto(new CartesianPoint(0, 1));

            assert.equal(p0.last, null);
            assert.equal(p0.next, p1);
            assert.equal(p1.last, p0);
            assert.equal(p1.next, null);
        });
    });

    describe('#fromArray(Open)', function () {
        it('should build an open path matching Array coordinates', function () {
            const p = Path.fromArray([[0, 0, 0], 
                                      [0, 1, 0], 
                                      [1, 1, 0], 
                                      [1, 0, 0], 
                                      [0, 0, 0]])
                                
            assert.deepEqual(p.pt, new CartesianPoint(0, 0, 0));
            assert.deepEqual(p.next.pt, new CartesianPoint(0, 1, 0));
            assert.deepEqual(p.next.next.pt, new CartesianPoint(1, 1, 0));
            assert.deepEqual(p.next.next.next.pt, new CartesianPoint(1, 0, 0));
            assert.deepEqual(p.next.next.next.next.pt, new CartesianPoint(0, 0, 0));
            assert.deepEqual(p.next.next.next.next.next, null);
        });
    });

    describe('#fromArray(Closed)', function () {
        it('should build an closed path matching Array coordinates', function () {
            const p = Path.fromArray([[0, 0, 0], 
                                      [0, 1, 0], 
                                      [1, 1, 0], 
                                      [1, 0, 0], 
                                      [0, 0, 0]], true)
                                
            assert.deepEqual(p.pt, new CartesianPoint(0, 0, 0));
            assert.deepEqual(p.next.pt, new CartesianPoint(0, 1, 0));
            assert.deepEqual(p.next.next.pt, new CartesianPoint(1, 1, 0));
            assert.deepEqual(p.next.next.next.pt, new CartesianPoint(1, 0, 0));
            assert.deepEqual(p.next.next.next.next.pt, new CartesianPoint(0, 0, 0));
            assert.deepEqual(p.next.next.next.next.next, p);
        });
    });

});

*/