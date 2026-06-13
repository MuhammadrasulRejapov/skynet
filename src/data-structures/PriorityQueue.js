/**
 * Max-Heap Priority Queue
 * For passenger check-in priority
 * Time: O(log n) insert/extract, O(1) peek
 */
class PriorityQueue {
    constructor() {
        this.heap = [];
        this.ticketPriorities = {
            'Platinum': 5,
            'Gold': 4,
            'Silver': 3,
            'Premium': 2,
            'Economy': 1
        };
    }

    insert(passenger) {
        this.heap.push(passenger);
        this._heapifyUp(this.heap.length - 1);
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._heapifyDown(0);
        return max;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }

    _heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this._compare(this.heap[index], this.heap[parentIndex]) > 0) {
                [this.heap[index], this.heap[parentIndex]] =
                    [this.heap[parentIndex], this.heap[index]];
                index = parentIndex;
            } else {
                break;
            }
        }
    }

    _heapifyDown(index) {
        while (true) {
            let maxIndex = index;
            const left = 2 * index + 1;
            const right = 2 * index + 2;

            if (left < this.heap.length &&
                this._compare(this.heap[left], this.heap[maxIndex]) > 0) {
                maxIndex = left;
            }

            if (right < this.heap.length &&
                this._compare(this.heap[right], this.heap[maxIndex]) > 0) {
                maxIndex = right;
            }

            if (maxIndex !== index) {
                [this.heap[index], this.heap[maxIndex]] =
                    [this.heap[maxIndex], this.heap[index]];
                index = maxIndex;
            } else {
                break;
            }
        }
    }

    _compare(a, b) {
        const priorityA = this.ticketPriorities[a.ticketStatus] || 0;
        const priorityB = this.ticketPriorities[b.ticketStatus] || 0;

        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }
        return a.arrivalTime - b.arrivalTime;
    }

    display() {
        console.log('\n=== CHECK-IN QUEUE (Priority) ===');
        const sorted = [...this.heap].sort((a, b) =>
            this._compare(b, a)
        );
        sorted.forEach((p, i) => {
            console.log(`${i + 1}. ${p.name} (${p.ticketStatus})`);
        });
    }
}

module.exports = PriorityQueue;