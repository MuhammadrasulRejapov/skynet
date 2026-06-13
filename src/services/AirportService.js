/**
 * Airport Service Layer
 * Business logic for airport operations
 */
const Graph = require('../data-structures/Graph');
const Dijkstra = require('../algorithms/Dijkstra');
const Kruskal = require('../algorithms/Kruskal');
const AirportState = require('../state/AirportState');

class AirportService {
    constructor() {
        this.graph = new Graph();
        this.state = new AirportState();
    }

    /**
     * Initialize network
     */
    initializeNetwork() {
        // Add airports
        this.graph.addAirport('JFK', 'John F. Kennedy', 'USA');
        this.graph.addAirport('LHR', 'London Heathrow', 'UK');
        this.graph.addAirport('CDG', 'Charles de Gaulle', 'France');
        this.graph.addAirport('DXB', 'Dubai International', 'UAE');
        this.graph.addAirport('NRT', 'Narita', 'Japan');
        this.graph.addAirport('SYD', 'Sydney Kingsford Smith', 'Australia');

        // Add to state
        const airports = ['JFK', 'LHR', 'CDG', 'DXB', 'NRT', 'SYD'];
        const info = {
            JFK: { name: 'John F. Kennedy', country: 'USA' },
            LHR: { name: 'London Heathrow', country: 'UK' },
            CDG: { name: 'Charles de Gaulle', country: 'France' },
            DXB: { name: 'Dubai International', country: 'UAE' },
            NRT: { name: 'Narita', country: 'Japan' },
            SYD: { name: 'Sydney Kingsford Smith', country: 'Australia' }
        };

        airports.forEach(code => {
            this.graph.addAirport(code, info[code].name, info[code].country);
            this.state.addAirport(code, info[code].name, info[code].country);
        });

        // Add routes
        this.graph.addRoute('JFK', 'LHR', 450, 5570, 7);
        this.graph.addRoute('JFK', 'CDG', 500, 5840, 7.5);
        this.graph.addRoute('JFK', 'DXB', 800, 8000, 12);
        this.graph.addRoute('LHR', 'CDG', 150, 340, 1);
        this.graph.addRoute('LHR', 'DXB', 600, 5500, 8);
        this.graph.addRoute('CDG', 'DXB', 550, 5000, 7);
        this.graph.addRoute('DXB', 'NRT', 700, 6800, 8);
        this.graph.addRoute('DXB', 'SYD', 900, 8200, 10);
        this.graph.addRoute('NRT', 'SYD', 650, 7800, 9);
        this.graph.addRoute('LHR', 'NRT', 900, 9600, 11);
    }

    /**
     * Find cheapest route
     */
    findCheapestRoute(from, to) {
        return Dijkstra.findCheapestRoute(this.graph, from, to);
    }

    /**
     * Build backup network
     */
    buildBackupNetwork() {
        return Kruskal.buildBackupNetwork(this.graph);
    }

    /**
     * Get all airports
     */
    getAllAirports() {
        return this.state.getAllAirports();
    }

    /**
     * Get airport info
     */
    getAirportInfo(code) {
        return this.graph.getAirportInfo(code);
    }

    /**
     * Display network
     */
    displayNetwork() {
        this.graph.display();
    }
}

module.exports = AirportService;