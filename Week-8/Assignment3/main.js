class Node {
    constructor(val, left, right) {
        this.val = (val === undefined ? 0 : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

class BinaryTree {
    constructor () {
        this.root = null;
    }
    //gets the root of the tree
    getRoot () {
        return this.root;
    }
    // inserts a node
    insert(val) { 
        let newNode = new Node(val);
        if(this.root == null) this.root = newNode;
        else {
            this.insertNode(this.root, newNode)
        }
    }
    insertNode(node, newNode) {
        //if new node is smaller than the root/current node 
        if (newNode.val < node.val) {
            // adds it as the left child 
            if (node.left == null) node.left = newNode;
            //or recursively call insertNode with current node's left child
            else this.insertNode(node.left, newNode)
        }
        //if new node is greater than the root/current node 
        else {
            // adds it as the right child 
            if (node.right == null) node.right = newNode;
            //or recursively call insertNode with current node's right child
            else this.insertNode(node.right, newNode)
        }
    }
}

function levelOrderTrav (root) {
    // initilaize queue with root & result to store each level as an array
    let queue = [root], result = [];
    // interate until there are rows/levels left in the tree 
    while(queue.length) {
        //interate overt the row/tree level and store each node in an array-row
        let len = queue.length, row = [];
        for (let i = 0; i < len; i++) {
            // get FIFO node from queue to remove the nodes for each row from queue and add to the row array
            let current = queue.shift();
            row.push(current.val); 
            //push the left and right child nodes of the current node to the queue for the next row
            if(current.left) queue.push(current.left);
            if(current.right) queue.push(current.right);
        }
        //push the new row to the result array
        result.push(row);
    }
    return result;
}
//TC: O(N)
//SC: O(N)
let BST = new BinaryTree();
BST.insert(15);
BST.insert(25);
BST.insert(10);
BST.insert(7);
BST.insert(22);
BST.insert(17);
BST.insert(13);
BST.insert(5);
BST.insert(27);
let root = BST.getRoot();

console.log(levelOrderTrav(root)); //output: [ [ 15 ], [ 10, 25 ], [ 7, 13, 22, 27 ], [ 5, 17 ] ]