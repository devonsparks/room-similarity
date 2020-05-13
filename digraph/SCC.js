const DFS = require('./DFS');
const PostOrderDFS = require('./PostOrderDFS');

class SCC extends DFS {
    constructor(digraph) {
        super(digraph);
        this.comps = [];
        this.idx = 0;
        this.order = undefined;

    }

    vertexOrder() {

        if(!this.order) {

        /* vertices visited in reverse postorder of tranpose(G) */
        let transposeG = this.digraph().reverse();
        this.order = (new PostOrderDFS(transposeG))
                .traverse()
                .postorder()
                .reverse();
        }

        return this.order;
    }

    previsit(vertex) {
        /* assign the current vertex to the current component */
        this.comps[this.idx] = this.comps[this.idx] || new Set([]);
        this.comps[this.idx].add(vertex);
    }


    posttraverse(vertex) {
        /* increment idx /after/ completing visits of all vertices
           in a component. */
        this.idx++;
    }

    components() {
        return new Set(this.comps);
    }

}

module.exports = SCC;