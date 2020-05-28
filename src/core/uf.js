class UF {
    constructor(N) {
        this.parents = new Array(N);
        this.count = N;

        while(N--) {
            this.parents[N] = N;
        }
    }

    find(p) {
        return this.parents[p];
    }

    union(p, q) {
        if(p >= this.parents.length)  
            throw new Error("First argument out of bounds");
        if(q >= this.parents.length) 
            throw new Error("Second argumement out of bounds");

        const [pParent, qParent] = [this.parents[p], this.parents[q]];
        
        if(pParent == qParent) return;

        /* update parent chain */
        for(let i = 0; i < this.parents.length; i++) {
            if(this.parents[i] == pParent) {
                this.parents[i] = qParent;
            }
        }


        this.count--;
    }

    uniqueParents() {
        return new Set(this.parents);
    }


}


module.exports = UF;