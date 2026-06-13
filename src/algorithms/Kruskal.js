/**
 * Kruskal's Algorithm
 * Minimum Spanning Tree for backup network
 * Time: O(E log E)
 */
class UnionFind {
    constructor(nodes) {
        this.parent = new Map();
        this.rank = new Map();

        nodes.forEach(node => {
            this.parent.set(node, node);
            this.rank.set(node, 0);
        });
    }

    find(x) {
        if (this.parent.get(x) !== x) {
            this.parent.set(x, this.find(this.parent.get(x)));
        }
        return this.parent.get(x);
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false;

        if (this.rank.get(rootX) < this.rank.get(rootY)) {
            this.parent.set(rootX, rootY);
        } else if (this.rank.get(rootX) > this.rank.get(rootY)) {
            this.parent.set(rootY, rootX);
        } else {
            this.parent.set(rootY, rootX);
            this.rank.set(rootX, this.rank.get(rootX) + 1);
        }
        return true;
    }
}

class Kruskal {
    static buildBackupNetwork(graph) {
        const edges = [];
        const nodes = graph.getAllNodes();

        // Extract all edges
        for (let from of nodes) {
            const neighbors = graph.getNeighbors(from);
            neighbors.forEach(neighbor => {
                edges.push({
                    from,
                    to: neighbor.destination,
                    weight: neighbor.cost
                });
            });
        }

        // Sort by weight
        edges.sort((a, b) => a.weight - b.weight);

        // Build MST
        const uf = new UnionFind(nodes);
        const mst = [];

        for (let edge of edges) {
            if (uf.union(edge.from, edge.to)) {
                mst.push(edge);
            }
        }

        return mst;
    }
}

module.exports = Kruskal;