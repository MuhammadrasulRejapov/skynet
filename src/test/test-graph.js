/**
 * Graph and Navigation Tests
 */
const Graph = require('../src/data-structures/Graph');
const Dijkstra = require('../src/algorithms/Dijkstra');
const Kruskal = require('../src/algorithms/Kruskal');

function testGraph() {
    console.log('═'.repeat(50));
    console.log('GRAPH TESTS');
    console.log('═'.repeat(50));

    const graph = new Graph();

    // Test 1: Add airports and routes
    console.log('\n✓ Test 1: Add Airports and Routes');
    graph.addAirport('A', 'Airport A', 'Country A');
    graph.addAirport('B', 'Airport B', 'Country B');
    graph.addAirport('C', 'Airport C', 'Country C');
    graph.addRoute('A', 'B', 100, 500, 2);
    graph.addRoute('B', 'C', 150, 600, 2.5);
    graph.addRoute('A', 'C', 200, 800, 3);
    console.log(`  Nodes: ${graph.getAllNodes().length} (expected: 3)`);

    // Test 2: Dijkstra
    console.log('\n✓ Test 2: Dijkstra Algorithm');
    const route = Dijkstra.findCheapestRoute(graph, 'A', 'C');
    console.log(`  Route: ${route.path.join(' → ')}`);
    console.log(`  Cost: ${route.totalCost} (expected: 200)`);
    console.log(`  Valid: ${route.isValid}`);

    // Test 3: Kruskal MST
    console.log('\n✓ Test 3: Kruskal MST');
    const mst = Kruskal.buildBackupNetwork(graph);
    console.log(`  MST edges: ${mst.length} (expected: 2)`);
    mst.forEach(edge => {
        console.log(`    ${edge.from} - ${edge.to}: ${edge.weight}`);
    });

    // Test 4: Non-existent path
    console.log('\n✓ Test 4: Non-existent Path');
    const noPath = Dijkstra.findCheapestRoute(graph, 'X', 'Y');
    console.log(`  Path found: ${noPath.isValid} (expected: false)`);
    console.log(`  Cost: ${noPath.totalCost} (expected: Infinity)`);
}

module.exports = testGraph;