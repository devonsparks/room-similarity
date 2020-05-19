
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

module.exports = {haussdorff, pairwise, dist2};