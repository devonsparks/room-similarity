
/*** frontend  ***/
L = require('leaflet')

const ctx = {
    map: L.map('mapid'),
    layer: null,

}



function update(ctx) {
    console.log("In update")
    ctx.layer = L.geoJSON(states, {
        style: function (feature) {
            switch (feature.properties.party) {
                case 'Republican': return { color: "#ff0000" };
                case 'Democrat': return { color: "#0000ff" };
                default: return { color: "#00ddff" };
            }
        }
    }).addTo(ctx.map);
}


/*** distance ***/
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








class KosaraSCC {
    constructor() {
        this.visited = {};
        this.components = {} // map vertices to components

    }
}
g = new Graph()
g.addedge(new Edge(0, 5))
g.addedge(new Edge(0, 1))
g.addedge(new Edge(0, 6))
g.addedge(new Edge(2, 0))
g.addedge(new Edge(2, 3))
g.addedge(new Edge(3, 5))
g.addedge(new Edge(5, 4))
g.addedge(new Edge(6, 4))
g.addedge(new Edge(6, 9))
g.addedge(new Edge(7, 6))
g.addedge(new Edge(8, 7))
g.addedge(new Edge(9, 10))
g.addedge(new Edge(9, 11))
g.addedge(new Edge(9, 12))
g.addedge(new Edge(11, 12))

dfs = new PostOrderDFS(g)

g3 = new Graph()
g3.addedge(new Edge(7, 5))
g3.addedge()


class SCC {
    constructor(graph) {
        this.g = graph;
        this.cc = {}
        this.visited = {}
        this.assigned = {}

    }

    compute() {
        console.log("inside compute")
        for (let vertex of this.g.vertices()) {
            this.visited[vertex] = false;
            this.assigned[vertex] = false;
        }

        let L = []
        for (let vertex of this.g.vertices()) {

            this.visit(vertex, L);
        }
        console.log(`Final L=${L}`)
        for (let vertex of L) {
            console.log(`calling assign with ${vertex}, ${vertex}`);
            this.assign(vertex, vertex);
        }

        return this.cc;
    }

    visit(vertex, L) {

        if (!this.visited[vertex]) {
            console.log(`visiting ${vertex}`)
            this.visited[vertex] = true;
            for (let neighbor of this.g.neighbors(vertex)) {
                this.visit(neighbor, L);
            }
            console.log(`L.append(${L})`);
            L.unshift(vertex);
        }
    }

    assign(vertex, root) {

        if (!this.assigned[vertex]) {
            if (!(root in this.cc)) {
                this.cc[root] = new Set([]);
            }
            this.cc[root].add(vertex);
            console.log(`assigned ${vertex} to ${root}`)
            this.assigned[vertex] = true;
            for (let neighbor of this.g.neighbors(vertex)) {
                console.log(`${vertex} has neighbor ${neighbor}`)
                this.assign(neighbor, root);
            }
        } else {
            console.log(`${vertex} already assigned`);
        }
    }
}


g = new Graph()
g.addedge(new Edge(2, 1))
g.addedge(new Edge(1, 0))
g.addedge(new Edge(0, 2))
g.addedge(new Edge(0, 3))
g.addedge(new Edge(3, 4))

cc = new SCC(g)


function distances(A, B) {
    let dists = new Graph()
    for (let pair of pairwise(A, B)) {
        dists.edge(...pair.concat(hausdorff(...pair)))
    }
}

function dist2(a, b) {
    return Math.sqrt(Math.pow(Math.abs(b[0] - a[0]), 2) + Math.pow(Math.abs(b[1] - a[1]), 2))
}

/* need some method for recording the evolution of the design of an artifact. Not just version control, but version control plus explanation.

Started with [], then made Point object, then generalized to dimensions. Show versions that are progressively more sophisticated.

*/