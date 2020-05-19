class UF {
    constructor(N) {
        this.parents = new Array(N);
        this.nexts = new Array(N);
        this.count = N;

        while(N--) {
            this.parents[N] = N;
            this.nexts[N] = N;
        }
    }

    find(p) {
        return this.parents[p];
    }

    rfind(p) {
        const results = [this.nexts[p]]

        while(results[results.length-1] != p) {
            results.push(this.nexts[results[results.length-1]]);
        }

        return results;
    }

    union(p, q) {
        if(p >= this.parents.length)  
            throw new Error("First argument out of bounds");
        if(q >= this.parents.length) 
            throw new Error("Second argumement out of bounds");


        /* update parent chain */
        const [pParent, qParent] = [this.parents[p], this.parents[q]];
        
        if(pParent == qParent) return;

        for(let i = 0; i < this.parents.length; i++) {
            if(this.parents[i] == pParent) {
                this.parents[i] = qParent;
            }
        }

        /* swap next pointers */
        const temp = this.nexts[p];
        this.nexts[p] = this.nexts[q];
        this.nexts[q] = temp;

        this.count--;
    }


}


module.exports = UF;