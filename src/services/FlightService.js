/**
 * Flight Service Layer
 */
const AVLTree = require('../data-structures/AVLTree');
const FlightState = require('../state/FlightState');
const SortingAlgorithms = require('../algorithms/SortingAlgorithms');

class FlightService {
    constructor() {
        this.priceTree = new AVLTree();
        this.state = new FlightState();
    }

    /**
     * Add flight
     */
    addFlight(flightId, from, to, departureTime, arrivalTime, price) {
        this.state.addFlight(flightId, {
            from,
            to,
            departureTime,
            arrivalTime,
            price
        });

        this.priceTree.insert(flightId, price);

        return this.state.getFlight(flightId);
    }

    /**
     * Find flights by price range
     */
    findFlightsByPriceRange(minPrice, maxPrice) {
        return this.priceTree.rangeQuery(minPrice, maxPrice);
    }

    /**
     * Sort flights by departure time
     */
    sortFlightsByDeparture(sortMethod = 'merge') {
        const flights = this.state.getAllFlights();
        const sortedFlights = sortMethod === 'quick'
            ? SortingAlgorithms.quickSort([...flights], 'departureTime')
            : SortingAlgorithms.mergeSort([...flights], 'departureTime');

        return sortedFlights;
    }

    /**
     * Get all flights
     */
    getAllFlights() {
        return this.state.getAllFlights();
    }

    /**
     * Get flight by ID
     */
    getFlight(flightId) {
        return this.state.getFlight(flightId);
    }

    /**
     * Update flight status
     */
    updateFlightStatus(flightId, status) {
        this.state.updateFlightStatus(flightId, status);
        return this.state.getFlight(flightId);
    }
}

module.exports = FlightService;