
import {iota, pairwise} from './utils';
import UF from './uf';

function haussdorff(A, B, members, dist) {
    let h = 0;

    for (let a of members(A)) {
        let shortest = Infinity;
        for (let b of members(B)) {
            let Dij = dist(a, b);
            if (Dij < shortest) {
                shortest = Dij;
            }
        }
        if (shortest > h) {
            h = shortest
        }
    }

    return h;
}




function dist2(a, b) {
    return Math.sqrt(Math.pow(Math.abs(b[0] - a[0]), 2) + Math.pow(Math.abs(b[1] - a[1]), 2))
}

function centroid(pts) {
    /* 2D shoelace method */
    let Cx = 0;
    let Cy = 0;
    let A = 0;
    
    const [x, y] = [(pt) => pt[0], (pt) => pt[1]];

    for (let i = 0; i < (pts.length - 1); i++) {
        const [Xi, Xii] = [x(pts[i]), x(pts[i + 1])];
        const [Yi, Yii] = [y(pts[i]), y(pts[i + 1])];

        Cx += (Xi + Xii) * (Xi * Yii - Xii * Yi);
        Cy += (Yi + Yii) * (Xi * Yii - Xii * Yi);
        A += (Xi * Yii - Xii * Yi);
    }

    A /= 2;
    Cx /= 6 * A;
    Cy /= 6 * A;
    return [Cx, Cy];
}


class GeoJSONRoom {

    constructor(geojson) {
        this.geojson = geojson;

        const loop = this.members();
        const center = centroid(loop);

        /* translate to origin */
        for (let i in loop) {
            const [x, y] = loop[i];
            loop[i] = [x - center[0], y - center[1]];
        }
    }

    members() {
        return this.geojson.geometry.coordinates[0];
    }

    distanceTo(otherRoom) {
        return haussdorff(this, otherRoom, (A) => A.members(), dist2)
    }

    setComponent(cid) {
        this.geojson.properties['component'] = cid;
    }

    toJSON() {
        return this.geojson;
    }

    centroid() {
        this.members
    }
}




function components(GeoJSON, threshold) {

    const rooms = [];

    for (let feature of GeoJSON.features) {
        rooms.push(new GeoJSONRoom(feature));
    }

    const partition = new UF(rooms.length);

    for (let [Ai, Bi] of pairwise(iota(rooms.length), iota(rooms.length))) {
        const [A, B] = [rooms[Ai], rooms[Bi]];
        const dist = Math.max(A.distanceTo(B), B.distanceTo(A));

        if (dist < threshold) {
            partition.union(Ai, Bi);
        }
    }

    for (let Ri in rooms) {
        rooms[Ri].setComponent(partition.find(Ri));
    }

    return [GeoJSON, partition.uniqueParents().size]
}


module.exports = { GeoJSONRoom, components };