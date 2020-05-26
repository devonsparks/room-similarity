
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


function* pairwise(A, B) {
    for (let a of A) {
        for (let b of B) {
            if (a != b) {
                yield [a, b]
            }
        }
    }
}


function dist2(a, b) {
    return Math.sqrt(Math.pow(Math.abs(b[0] - a[0]), 2) + Math.pow(Math.abs(b[1] - a[1]), 2))
}

function centroid(pts) {
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

module.exports = { haussdorff, pairwise, dist2, centroid };