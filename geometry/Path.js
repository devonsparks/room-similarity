const CartesianPoint = require('./CartesianPoint');

class Path {
    constructor(pt) {
        this.pt = pt;
        this.next = null;
        this.last = null; 
    }

    lineto(pt) {
        const next = new Path(pt);
        this.next = next;
        next.last = this;
        return next;
    }

    static fromArray(arr, close = false) {
        const p0 = new Path(CartesianPoint.fromArray(arr[0]));
        let p = p0; 
        for(let pt of arr.slice(1)) {
            p = p.lineto(CartesianPoint.fromArray(pt));
        }
        if(close) {
            p.next = p0;
            p0.last = p;
        }
        return p0;
    }
}



module.exports = Path;