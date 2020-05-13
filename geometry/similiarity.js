
function haussdorff(A, B, dist) {
    let h = 0;
    for (let a of A) {
        let shortest = Infinity;
        for (let b of B) {
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
    for (let a in A) {
        for (let b in B) {
            if (a != b) {
                yield [a, b]
            }
        }
    }
}


function distances(A, B) {
    let dists = new Graph()
    for (let pair of pairwise(A, B)) {
        dists.edge(...pair.concat(hausdorff(...pair)))
    }
}

function dist2(a, b) {
    return Math.sqrt(Math.pow(Math.abs(b[0] - a[0]), 2) + Math.pow(Math.abs(b[1] - a[1]), 2))
}