/**
 * Cargo Service Layer
 */
const Stack = require('../data-structures/Stack');

class CargoService {
    constructor() {
        this.cargoStack = new Stack();
        this.cargoLog = [];
    }

    /**
     * Load cargo (push to stack)
     */
    loadCargo(owner, description, weight) {
        const cargo = { owner, description, weight };
        this.cargoStack.push(cargo);
        this.cargoLog.push({
            action: 'LOADED',
            cargo,
            timestamp: new Date()
        });
        return cargo;
    }

    /**
     * Unload cargo (pop from stack)
     */
    unloadCargo() {
        const cargo = this.cargoStack.pop();
        if (cargo) {
            this.cargoLog.push({
                action: 'UNLOADED',
                cargo,
                timestamp: new Date()
            });
        }
        return cargo;
    }

    /**
     * Peek at top cargo
     */
    peekCargo() {
        return this.cargoStack.peek();
    }

    /**
     * Get cargo stack size
     */
    getCargoCount() {
        return this.cargoStack.size();
    }

    /**
     * Check if cargo hold is empty
     */
    isCargoEmpty() {
        return this.cargoStack.isEmpty();
    }

    /**
     * Display cargo stack
     */
    displayCargoStack() {
        this.cargoStack.display();
    }
}

module.exports = CargoService;