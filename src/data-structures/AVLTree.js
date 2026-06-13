/**
 * AVL Tree - Self-Balancing BST
 * For flight price range queries
 * Time: O(log n) search/insert/delete
 */
class AVLNode {
    constructor(flightId, price) {
        this.flightId = flightId;
        this.price = price;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    insert(flightId, price) {
        this.root = this._insertNode(this.root, flightId, price);
    }

    _insertNode(node, flightId, price) {
        if (node === null) {
            return new AVLNode(flightId, price);
        }

        if (price < node.price) {
            node.left = this._insertNode(node.left, flightId, price);
        } else if (price > node.price) {
            node.right = this._insertNode(node.right, flightId, price);
        } else {
            return node;
        }

        node.height = Math.max(
            this._getHeight(node.left),
            this._getHeight(node.right)
        ) + 1;

        const balance = this._getBalance(node);

        // Left Left
        if (balance > 1 && price < node.left.price) {
            return this._rotateRight(node);
        }

        // Right Right
        if (balance < -1 && price > node.right.price) {
            return this._rotateLeft(node);
        }

        // Left Right
        if (balance > 1 && price > node.left.price) {
            node.left = this._rotateLeft(node.left);
            return this._rotateRight(node);
        }

        // Right Left
        if (balance < -1 && price < node.right.price) {
            node.right = this._rotateRight(node.right);
            return this._rotateLeft(node);
        }

        return node;
    }

    _getHeight(node) {
        return node ? node.height : 0;
    }

    _getBalance(node) {
        return node ?
            this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }

    _rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        y.height = Math.max(
            this._getHeight(y.left),
            this._getHeight(y.right)
        ) + 1;
        x.height = Math.max(
            this._getHeight(x.left),
            this._getHeight(x.right)
        ) + 1;

        return x;
    }

    _rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        x.height = Math.max(
            this._getHeight(x.left),
            this._getHeight(x.right)
        ) + 1;
        y.height = Math.max(
            this._getHeight(y.left),
            this._getHeight(y.right)
        ) + 1;

        return y;
    }

    rangeQuery(minPrice, maxPrice) {
        const result = [];
        this._rangeSearch(this.root, minPrice, maxPrice, result);
        return result;
    }

    _rangeSearch(node, minPrice, maxPrice, result) {
        if (node === null) return;

        if (node.price >= minPrice) {
            this._rangeSearch(node.left, minPrice, maxPrice, result);
        }

        if (node.price >= minPrice && node.price <= maxPrice) {
            result.push({ flightId: node.flightId, price: node.price });
        }

        if (node.price <= maxPrice) {
            this._rangeSearch(node.right, minPrice, maxPrice, result);
        }
    }

    displayInOrder() {
        const result = [];
        this._inOrder(this.root, result);
        return result;
    }

    _inOrder(node, result) {
        if (node !== null) {
            this._inOrder(node.left, result);
            result.push({ flightId: node.flightId, price: node.price });
            this._inOrder(node.right, result);
        }
    }
}

module.exports = AVLTree;