function* pairwise(A, B) {
    for (let a of A) {
        for (let b of B) {
            if (a != b) {
                yield [a, b]
            }
        }
    }
}

function iota(size) {
    return Array.from({ length: size }, (v, k) => k)
}

module.exports = {pairwise, iota};