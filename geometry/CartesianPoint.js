class CartesianPoint {
    constructor(x, y, z=0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static fromArray(arr) {
        if(arr.length < 2) {
            throw new Error("Array input must have to entries to define a Point");
        }
        return new CartesianPoint(arr[0], arr[1], arr[2])
    }
}

module.exports = CartesianPoint;