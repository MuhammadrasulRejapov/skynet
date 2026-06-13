/**
 * LIFO Stack - Cargo Hold
 * Time: O(1) all operations
 */
class Stack {
    constructor() {
        this.stack = [];
    }

    push(cargo) {
        this.stack.push(cargo);
    }

    pop() {
        return this.stack.pop();
    }

    peek() {
        return this.stack.length > 0 ?
            this.stack[this.stack.length - 1] : null;
    }

    isEmpty() {
        return this.stack.length === 0;
    }

    size() {
        return this.stack.length;
    }

    display() {
        console.log('\n=== CARGO HOLD (LIFO) ===');
        console.log('Top (Last In)');
        [...this.stack].reverse().forEach((c, i) => {
            console.log(`${i + 1}. ${c.owner} - ${c.description}`);
        });
        console.log('Bottom (First Out)');
    }
}

module.exports = Stack;