/**
 * Passenger Service Layer
 */
const PriorityQueue = require('../data-structures/PriorityQueue');
const Queue = require('../data-structures/Queue');
const HashTable = require('../data-structures/HashTable');
const PassengerState = require('../state/PassengerState');
const StringMatching = require('../algorithms/StringMatching');

class PassengerService {
    constructor() {
        this.checkInQueue = new PriorityQueue();
        this.boardingQueue = new Queue();
        this.passengerDB = new HashTable();
        this.state = new PassengerState();
    }

    /**
     * Register passenger
     */
    registerPassenger(pnr, name, flight, seat, ticketStatus) {
        const passengerData = {
            pnr,
            name,
            flight,
            seat,
            ticketStatus
        };

        this.passengerDB.set(pnr, passengerData);
        this.state.addPassenger(pnr, passengerData);

        return passengerData;
    }

    /**
     * Add to check-in queue
     */
    addToCheckInQueue(pnr, arrivalTime) {
        const passenger = this.passengerDB.get(pnr);
        if (passenger) {
            this.checkInQueue.insert({
                ...passenger,
                arrivalTime
            });
            return true;
        }
        return false;
    }

    /**
     * Process check-in
     */
    processCheckIn() {
        const passenger = this.checkInQueue.extractMax();
        if (passenger) {
            this.state.updatePassengerStatus(passenger.pnr, 'CHECKED_IN');
            this.state.logCheckIn(passenger.pnr);
            this.boardingQueue.enqueue(passenger);
            return passenger;
        }
        return null;
    }

    /**
     * Process boarding
     */
    processBoarding() {
        const passenger = this.boardingQueue.dequeue();
        if (passenger) {
            this.state.updatePassengerStatus(passenger.pnr, 'BOARDED');
            this.state.logBoarding(passenger.pnr);
            return passenger;
        }
        return null;
    }

    /**
     * Search passengers by name
     */
    searchPassengers(namePattern) {
        const allPassengers = this.state.getAllPassengers();
        return StringMatching.searchPassengersInManifest(
            allPassengers,
            namePattern
        );
    }

    /**
     * Get passenger by PNR
     */
    getPassenger(pnr) {
        return this.passengerDB.get(pnr);
    }

    /**
     * Display check-in queue
     */
    displayCheckInQueue() {
        this.checkInQueue.display();
    }

    /**
     * Display boarding queue
     */
    displayBoardingQueue() {
        this.boardingQueue.display();
    }

    /**
     * Get queue sizes
     */
    getQueueSizes() {
        return {
            checkIn: this.checkInQueue.size(),
            boarding: this.boardingQueue.size()
        };
    }
}

module.exports = PassengerService;