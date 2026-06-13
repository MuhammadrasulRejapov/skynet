/**
 * Dijkstra's Algorithm
 * Find minimum cost path between two airports
 * Time: O((V + E) log V)
 */

function findCheapestRoute(graph, start, end) {
    const distances = new Map();
    const previous = new Map();
    const unvisited = new Set();

    // Initialize
    for (let airport of graph.getAllNodes()) {
        distances.set(airport, Infinity);
        unvisited.add(airport);
    }
    distances.set(start, 0);

    while (unvisited.size > 0) {
        // Find unvisited with minimum distance
        let current = null;
        let minDistance = Infinity;

        for (let airport of unvisited) {
            if (distances.get(airport) < minDistance) {
                minDistance = distances.get(airport);
                current = airport;
            }
        }

        if (current === null || current === end) break;
        unvisited.delete(current);

        // Check neighbors
        const neighbors = graph.getNeighbors(current);
        for (let neighbor of neighbors) {
            const alt = distances.get(current) + neighbor.cost;

            if (alt < distances.get(neighbor.destination)) {
                distances.set(neighbor.destination, alt);
                previous.set(neighbor.destination, current);
            }
        }
    }

    // Reconstruct path
    const path = [];
    let current = end;
    while (current !== undefined) {
        path.unshift(current);
        current = previous.get(current);
    }

    return {
        path: distances.get(end) !== Infinity ? path : [],
        totalCost: distances.get(end),
        isValid: distances.get(end) !== Infinity
    };
}

module.exports = { findCheapestRoute };