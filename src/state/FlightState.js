/**
 * Flight State Management
 */
class FlightState {
    constructor() {
        this.flights = new Map();
        this.routes = new Map();
    }

    addFlight(flightId, data) {
        this.flights.set(flightId, {
            flightId,
            ...data,
            status: 'SCHEDULED',
            passengerCount: 0,
            cargoWeight: 0
        });
    }

    addRoute(routeId, from, to, cost, distance, time) {
        this.routes.set(routeId, {
            routeId,
            from,
            to,
            cost,
            distance,
            time,
            status: 'ACTIVE'
        });
    }

    getFlight(flightId) {
        return this.flights.get(flightId);
    }

    getRoute(routeId) {
        return this.routes.get(routeId);
    }

    updateFlightStatus(flightId, status) {
        const flight = this.flights.get(flightId);
        if (flight) {
            flight.status = status;
        }
    }

    updateRouteStatus(routeId, status) {
        const route = this.routes.get(routeId);
        if (route) {
            route.status = status;
        }
    }

    getAllFlights() {
        return Array.from(this.flights.values());
    }

    getAllRoutes() {
        return Array.from(this.routes.values());
    }

    getFlightsByStatus(status) {
        return Array.from(this.flights.values())
            .filter(f => f.status === status);
    }
}

module.exports = FlightState;