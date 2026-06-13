/**
 * Passenger State Management
 */
class PassengerState {
    constructor() {
        this.passengers = new Map();
        this.checkInLog = [];
        this.boardingLog = [];
    }

    addPassenger(pnr, data) {
        this.passengers.set(pnr, {
            ...data,
            checkInTime: null,
            boardingTime: null,
            status: 'REGISTERED'
        });
    }

    updatePassengerStatus(pnr, status) {
        const passenger = this.passengers.get(pnr);
        if (passenger) {
            passenger.status = status;

            if (status === 'CHECKED_IN') {
                passenger.checkInTime = new Date();
            } else if (status === 'BOARDED') {
                passenger.boardingTime = new Date();
            }
        }
    }

    getPassenger(pnr) {
        return this.passengers.get(pnr);
    }

    getAllPassengers() {
        return Array.from(this.passengers.values());
    }

    getPassengersByStatus(status) {
        return Array.from(this.passengers.values())
            .filter(p => p.status === status);
    }

    getPassengerCount() {
        return this.passengers.size;
    }

    logCheckIn(pnr) {
        this.checkInLog.push({
            pnr,
            timestamp: new Date()
        });
    }

    logBoarding(pnr) {
        this.boardingLog.push({
            pnr,
            timestamp: new Date()
        });
    }
}

module.exports = PassengerState;