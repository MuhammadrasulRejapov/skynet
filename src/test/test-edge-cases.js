/**
 * Edge Case Tests
 */
const Graph = require('../src/data-structures/Graph');
const Dijkstra = require('../src/algorithms/Dijkstra');
const PriorityQueue = require('../src/data-structures/PriorityQueue');
const Stack = require('../src/data-structures/Stack');

function testEdgeCases() {
    console.log('\n═'.repeat(50));
    console.log('EDGE CASE TESTS');
    console.log('═'.repeat(50));

    // Test 1: Empty Graph
    console.log('\n✓ Test 1: Empty Graph');
    const emptyGraph = new Graph();
    const emptyRoute = Dijkstra.findCheapestRoute(emptyGraph, 'A', 'B');
    console.log(`  Route found: ${emptyRoute.isValid} (expected: false)`);
    console.log(`  Path: ${emptyRoute.path.length === 0 ? 'empty' : 'has items'}`);

    // Test 2: Single Node (Same Start and End)
    console.log('\n✓ Test 2: Single Node');
    const singleGraph = new Graph();
    singleGraph.addAirport('X', 'Airport X', 'Country X');
    const singleRoute = Dijkstra.findCheapestRoute(singleGraph, 'X', 'X');
    console.log(`  Path: ${singleRoute.path.join(' → ')}`);
    console.log(`  Cost: ${singleRoute.totalCost}`);

    // Test 3: Priority Collision
    console.log('\n✓ Test 3: Priority Collision (Same Priority)');
    const pq = new PriorityQueue();
    pq.insert({ name: 'A', ticketStatus: 'Gold', arrivalTime: 30 });
    pq.insert({ name: 'B', ticketStatus: 'Gold', arrivalTime: 20 });
    pq.insert({ name: 'C', ticketStatus: 'Gold', arrivalTime: 40 });

    console.log('  Processing (should order by arrival time):');
    let order = [];
    while (!pq.isEmpty()) {
        order.push(pq.extractMax().name);
    }
    console.log(`  Order: ${order.join(' → ')} (expected: B → A → C)`);

    // Test 4: Empty Stack Pop
    console.log('\n✓ Test 4: Empty Stack Operations');
    const emptyStack = new Stack();
    console.log(`  pop() on empty: ${emptyStack.pop() === undefined ? 'null' : 'value'}`);
    console.log(`  peek() on empty: ${emptyStack.peek() === null ? 'null' : 'value'}`);
    console.log(`  isEmpty(): ${emptyStack.isEmpty()}`);

    // Test 5: Duplicate Values
    console.log('\n✓ Test 5: Duplicate Values in Heap');
    const dupQueue = new PriorityQueue();
    for (let i = 0; i < 5; i++) {
        dupQueue.insert({
            name: `Passenger${i}`,
            ticketStatus: 'Economy',
            arrivalTime: 10
        });
    }
    console.log(`  Size with 5 identical items: ${dupQueue.size()}`);
}

module.exports = testEdgeCases;