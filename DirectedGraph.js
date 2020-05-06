class Edge {
    constructor(from, to, weight = 1) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
}


class DirectedGraph {
    constructor() {
        this.g = {};
    }
    addEdge(edge) {
        this.g[edge.from] = this.g[edge.from] || new Set([]);
        this.g[edge.to] = this.g[edge.to] || new Set([]);
        this.g[edge.from].add(edge);
    }

    vertices() {
        return Object.keys(this.g).sort();
    }

    reverse() {
        const rg = new DirectedGraph();
        for(let vertex of this.vertices()) {
            for(let neighbor of this.neighbors(vertex)) {
                rg.addEdge(new Edge(neighbor, vertex));
            }
        }

        return rg;
    }

    *neighbors(vertex) {
        if (this.vertices().includes(vertex)) {
            for (let edge of this.g[vertex]) {
                yield edge.to;
            }
        } 
    }
}

module.exports = {DirectedGraph, Edge};
