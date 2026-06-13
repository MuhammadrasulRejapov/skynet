/**
 * Graph ADT - Airport Network
 * Adjacency List Implementation
 */
class Graph {
    constructor() {
        this.adjacencyList = new Map();
        this.airports = new Map();
    }

    /**
     * Add airport (node)
     * Time: O(1)
     */
    addAirport(code, name, country) {
        if (!this.adjacencyList.has(code)) {
            this.adjacencyList.set(code, []);
            this.airports.set(code, { name, country });
        }
    }

    /**
     * Add route (edge)
     * Time: O(1)
     */
    addRoute(from, to, cost, distance, time) {
        if (!this.adjacencyList.has(from))
            this.addAirport(from, from, 'Unknown');
        if (!this.adjacencyList.has(to))
            this.addAirport(to, to, 'Unknown');

        this.adjacencyList.get(from).push({
            destination: to,
            cost,
            distance,
            time
        });
    }

    getNeighbors(node) {
        return this.adjacencyList.get(node) || [];
    }

    getAllNodes() {
        return Array.from(this.adjacencyList.keys());
    }

    getAirportInfo(code) {
        return this.airports.get(code);
    }

    display() {
        console.log('\n=== AIRPORT NETWORK ===');
        for (let [airport, routes] of this.adjacencyList) {
            const info = this.airports.get(airport);
            console.log(`\n${airport} (${info.name}) - ${info.country}`);
            routes.forEach(route => {
                console.log(`  → ${route.destination}: $${route.cost}`);
            });
        }
    }
}

module.exports = Graph;
