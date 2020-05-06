class PostOrderDFS {

    constructor(graph) {
        this.g = graph;
        this.visited = {};
        this.post = []

        for (let vertex of this.g.vertices()) {
            this.visited[vertex] = false;
        }

        
        for (let vertex of this.g.vertices()) {
            if (!this.visited[vertex]) {
                this.visit(vertex);
            }
        }

    }

    postorder() {
        return this.post;
    }


    visit(vertex) {

        this.visited[vertex] = true;
        for (let neighbor of this.g.neighbors(vertex)) {
            if (!this.visited[neighbor]) {
                this.visit(neighbor);
            }
        }
        this.post.push(vertex);
    }
}

module.exports = PostOrderDFS;