/**
 * Queue and Stack Tests
 */
const PriorityQueue = require('../src/data-structures/PriorityQueue');
const Queue = require('../src/data-structures/Queue');
const Stack = require('../src/data-structures/Stack');

function testQueues() {
    console.log('\n═'.repeat(50));
    console.log('QUEUE AND STACK TESTS');
    console.log('═'.repeat(50));

    // Test Priority Queue
    console.log('\n✓ Test 1: Priority Queue');
    const pq = new PriorityQueue();
    pq.insert({ name: 'A', ticketStatus: 'Economy', arrivalTime: 10 });
    pq.insert({ name: 'B', ticketStatus: 'Platinum', arrivalTime: 20 });
    pq.insert({ name: 'C', ticketStatus: 'Gold', arrivalTime: 15 });

    console.log(`  Size: ${pq.size()} (expected: 3)`);
    const first = pq.extractMax();
    console.log(`  First extracted: ${first.name} (expected: B - Platinum)`);

    // Test FIFO Queue
    console.log('\n✓ Test 2: FIFO Queue');
    const q = new Queue();
    q.enqueue({ name: 'P1', seat: '1A' });
    q.enqueue({ name: 'P2', seat: '2A' });
    q.enqueue({ name: 'P3', seat: '3A' });

    console.log(`  Size: ${q.size()} (expected: 3)`);
    const first_q = q.dequeue();
    console.log(`  First dequeued: ${first_q.name} (expected: P1)`);

    // Test LIFO Stack
    console.log('\n✓ Test 3: LIFO Stack');
    const s = new Stack();
    s.push({ owner: 'Person1', weight: 20 });
    s.push({ owner: 'Person2', weight: 15 });
    s.push({ owner: 'Person3', weight: 25 });

    console.log(`  Size: ${s.size()} (expected: 3)`);
    const first_s = s.pop();
    console.log(`  First popped: ${first_s.owner} (expected: Person3 - LIFO)`);

    // Test empty operations
    console.log('\n✓ Test 4: Empty Operations');
    const emptyQ = new Queue();
    console.log(`  isEmpty: ${emptyQ.isEmpty()} (expected: true)`);
    console.log(`  dequeue: ${emptyQ.dequeue() === undefined ? 'undefined' : 'value'}`);
}

module.exports = testQueues;