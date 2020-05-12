const DFS = require('./DFS');

class PostOrderDFS extends DFS {
    constructor(digraph) {
        super(digraph);
        this.post = [];

    }

    postvisit(vertex) {
        this.post.push(vertex);

    }

    postorder() {
        return this.post;
    }

}

module.exports = PostOrderDFS;