/**
 * Backtracking Algorithm
 * Find alternative flight paths
 * Time: O(V! * E) pruned
 */
class Backtracking {
    constructor(graph) {
        this.graph = graph;
        this.allPaths = [];
    }

    findAlternativePaths(start, end, unavailableNodes = []) {
        this.allPaths = [];
        const visited = new Set();
        const path = [start];

        this._backtrack(start, end, visited, path, unavailableNodes);

        return this.allPaths;
    }

    _backtrack(current, destination, visited, path, unavailableNodes) {
        if (current === destination) {
            this.allPaths.push([...path]);
            return;
        }

        visited.add(current);

        const neighbors = this.graph.getNeighbors(current);
        for (let neighbor of neighbors) {
            const next = neighbor.destination;

            if (!unavailableNodes.includes(next) && !visited.has(next)) {
                path.push(next);
                this._backtrack(next, destination, visited, path, unavailableNodes);
                path.pop();
            }
        }

        visited.delete(current);
    }

    findBestAlternativeRoute(start, end, unavailableNodes = []) {
        const paths = this.findAlternativePaths(start, end, unavailableNodes);

        if (paths.length === 0) return null;

        const pathsWithCost = paths.map(path => {
            let totalCost = 0;
            for (let i = 0; i < path.length - 1; i++) {
                const neighbors = this.graph.getNeighbors(path[i]);
                const edge = neighbors.find(n => n.destination === path[i + 1]);
                if (edge) totalCost += edge.cost;
            }
            return { path, cost: totalCost };
        });

        return pathsWithCost.reduce((min, current) =>
            current.cost < min.cost ? current : min
        );
    }
}

module.exports = Backtracking;