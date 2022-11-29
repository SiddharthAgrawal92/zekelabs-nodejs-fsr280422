
class BinarySearchTreeNode {
    constructor(key, value = key, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    //if any node is a leaf node
    get isLeaf() {
        return this.left == null && this.right == null;
    }

    get hasChildren() {
        return !!(this.left || this.right);
    }
}

class BinarySearchTree {
    constructor(key, value = key) {
        this.root = new BinarySearchTreeNode(key, value);
    }

    //generator functions in javascript --> these functions starts with * and they yield 
    //the value based on the logic you put on them

    //inOrderTraversal --> L-Root-R
    *inOrderTraversal(node = this.root) {
        if (node.left) yield* this.inOrderTraversal(node.left);
        yield node;
        if (node.right) yield* this.inOrderTraversal(node.right);
    }

    //postOrderTraversal --> L-R-Root
    *postOrderTraversal(node = this.root) {
        if (node.left) yield* this.postOrderTraversal(node.left);
        if (node.right) yield* this.postOrderTraversal(node.right);
        yield node;
    }

    //preOrderTraversal --> Root-Left-Right
    *preOrderTraversal(node = this.root) {
        yield node;
        if (node.left) yield* this.preOrderTraversal(node.left);
        if (node.right) yield* this.preOrderTraversal(node.right);
    }

    //insert a node
    insert(key, value = key) {
        let node = this.root; //root-node
        while (true) {
            if (node.key === key) return false;
            if (node.key > key) {
                if (node.left != null) {
                    node = node.left;
                } else {
                    node.left = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            } else if (node.key < key) {
                if (node.right != null) {
                    node = node.right;
                } else {
                    node.right = new BinarySearchTreeNode(key, value, node);
                    return true;
                }
            }
        }
    }

    //to find a node using node-key
    find(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return node;
        }
        return undefined;
    }

    //if node exists for a given key
    has(key) {
        for (let node of this.postOrderTraversal()) {
            if (node.key === key) return true;
        }
        return false;
    }

    //remove a node
    remove(key) {
        const node = this.find(key);
        if (!node) return false;
        const isRoot = node.parent === null;
        const isLeftChild = !isRoot ? node.parent.left = node : false;
        const hasBothChildren = node.left !== null && node.right !== null;

        if (node.isLeaf) {
            if (!isRoot) {
                if (isLeftChild) {
                    node.parent.left = null;
                } else {
                    node.parent.right = null;
                }
            } else {
                this.root = null;
            }
            return true;
        } else if (!hasBothChildren) {
            const child = node.left !== null ? node.left : node.right;
            if (!isRoot) {
                if (isLeftChild) {
                    node.parent.left = child;
                } else {
                    node.parent.right = right;
                }
            } else {
                this.root = child;
            }
            child.parent = node.parent;
            return true;
        } else {
            const rightMostValue = [...this.inOrderTraversal(node.left)].slice(-1)[0];
            rightMostValue.parent = node.parent;
            if (!isRoot) {
                if (isLeftChild) {
                    node.parent.left = rightMostValue;
                } else {
                    node.parent.right = rightMostValue;
                }
            } else {
                this.root = rightMostValue;
            }
            rightMostValue.right = node.right;
            node.right.parent = rightMostValue;
            return true;
        }
    }

}

//create binary tree with root node key&value 30;
const tree = new BinarySearchTree(30);

tree.insert(10);
tree.insert(15);
tree.insert(20);
tree.insert(40);
tree.insert(35);
tree.insert(50);

//preOrderTraversal
// console.log('preOrderTraversal: ', [...tree.preOrderTraversal()].map(x => x.value));

//inOrderTraversal
// console.log('inOrderTraversal: ', [...tree.inOrderTraversal()].map(x => x.value));

// //postOrderTraversal
// console.log('postOrderTraversal: ', [...tree.postOrderTraversal()].map(x => x.value));

// console.log('Root Value', tree.root.value); //Return the root-value

// console.log('Root Has Children: ', tree.root.hasChildren); //Root Has Children

// console.log('Check if 20 is a leaf', tree.find(20).isLeaf);

// console.log('Check parent of 20 ', tree.find(20).parent.value);

tree.remove(50);

console.log([...tree.preOrderTraversal()].map(x => (
    {
        key: x.key,
        parent: x.parent ? x.parent.key : null
    }
)));

