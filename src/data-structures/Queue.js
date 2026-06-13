/**
 * FIFO Queue - Boarding Gate
 * Time: O(1) all operations
 */
class Queue {
    constructor() {
        this.queue = [];
    }

    enqueue(passenger) {
        this.queue.push(passenger);
    }

    dequeue() {
        return this.queue.shift();
    }

    peek() {
        return this.queue.length > 0 ? this.queue[0] : null;
    }

    isEmpty() {
        return this.queue.length === 0;
    }

    size() {
        return this.queue.length;
    }

    display() {
        console.log('\n=== BOARDING GATE (FIFO) ===');
        this.queue.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} - Seat: ${p.seat}`);
        });
    }
}

module.exports = Queue;