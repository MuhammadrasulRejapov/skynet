/**
 * Hash Table - PNR Database
 * Time: O(1) average lookup
 */
class HashTable {
    constructor() {
        this.database = new Map();
    }

    set(pnr, passengerData) {
        this.database.set(pnr, passengerData);
    }

    get(pnr) {
        return this.database.get(pnr) || null;
    }

    update(pnr, updates) {
        if (this.database.has(pnr)) {
            const passenger = this.database.get(pnr);
            this.database.set(pnr, { ...passenger, ...updates });
            return true;
        }
        return false;
    }

    delete(pnr) {
        return this.database.delete(pnr);
    }

    has(pnr) {
        return this.database.has(pnr);
    }

    getAll() {
        return Array.from(this.database.entries());
    }

    display() {
        console.log('\n=== PASSENGER DATABASE ===');
        for (let [pnr, passenger] of this.database) {
            console.log(`${pnr}: ${passenger.name} - ${passenger.seat}`);
        }
    }
}

module.exports = HashTable;