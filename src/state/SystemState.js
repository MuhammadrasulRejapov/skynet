/**
 * Global System State Management
 * Redux-like pattern (simplified)
 */
class SystemState {
    constructor() {
        this.state = {
            airports: [],
            passengers: {},
            flights: [],
            routes: [],
            checkInQueue: [],
            boardingQueue: [],
            cargo: [],
            activeFlights: []
        };

        this.listeners = [];
    }

    /**
     * Subscribe to state changes
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * Notify all listeners of state change
     */
    _notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }

    /**
     * Update state
     */
    updateState(updates) {
        this.state = {
            ...this.state,
            ...updates
        };
        this._notifyListeners();
    }

    /**
     * Add airport
     */
    addAirport(code, name, country) {
        this.updateState({
            airports: [...this.state.airports, { code, name, country }]
        });
    }

    /**
     * Add passenger
     */
    addPassenger(pnr, data) {
        this.updateState({
            passengers: {
                ...this.state.passengers,
                [pnr]: data
            }
        });
    }

    /**
     * Update passenger in check-in queue
     */
    updateCheckInQueue(queue) {
        this.updateState({
            checkInQueue: queue
        });
    }

    /**
     * Get current state
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Get specific data
     */
    getAirports() {
        return this.state.airports;
    }

    getPassenger(pnr) {
        return this.state.passengers[pnr] || null;
    }

    getCheckInQueue() {
        return this.state.checkInQueue;
    }

    displayState() {
        console.log('\n=== SYSTEM STATE ===');
        console.log(`Airports: ${this.state.airports.length}`);
        console.log(`Passengers: ${Object.keys(this.state.passengers).length}`);
        console.log(`Check-in Queue: ${this.state.checkInQueue.length}`);
        console.log(`Boarding Queue: ${this.state.boardingQueue.length}`);
        console.log(`Cargo: ${this.state.cargo.length}`);
    }
}

module.exports = SystemState;