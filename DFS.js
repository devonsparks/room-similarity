class DFS {

    constructor(digraph) {
        this.g = digraph;
        this.visited = {};

        for (let vertex of this.g.vertices()) {
            this.visited[vertex] = false;
        }

    }

    digraph() {
        return this.g;
    }

    
    vertexOrder() {
        return this.g.vertices();
    }


    pretraverse(vertex) {
        /* no-op */
    }

    posttraverse(vertex) {
        /* no-op */
    }

    traverse() {
        for (let vertex of this.vertexOrder()) {
      
            if (!this.visited[vertex]) {
                this.pretraverse(vertex);
                this.visit(vertex);
                this.posttraverse(vertex);
            }
        }

        return this;
    }



    previsit(vertex) {
        /* no-op */
    }

    postvisit(vertex) {
        /* no-op */
    }

    visit(vertex) {

        this.previsit(vertex);

        this.visited[vertex] = true;
        for (let neighbor of this.g.neighbors(vertex)) {
            if (!this.visited[neighbor]) {
                this.visit(neighbor);
            }
        }

        this.postvisit(vertex);

    }
}

module.exports = DFS;