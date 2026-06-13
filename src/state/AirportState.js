/**
 * Airport State Management
 */
class AirportState {
    constructor() {
        this.airports = new Map();
    }

    addAirport(code, name, country) {
        this.airports.set(code, {
            code,
            name,
            country,
            totalFlights: 0,
            totalPassengers: 0,
            status: 'OPERATIONAL'
        });
    }

    getAirport(code) {
        return this.airports.get(code);
    }

    updateAirportStatus(code, status) {
        const airport = this.airports.get(code);
        if (airport) {
            airport.status = status;
        }
    }

    getAllAirports() {
        return Array.from(this.airports.values());
    }

    getAirportCount() {
        return this.airports.size;
    }
}

module.exports = AirportState;