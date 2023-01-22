var maxDepth = function(root) { 
    // if a node has no children we return 0
    if (!root) return 0;
    // maximum depth of any node is the maximum number of nodes in either of its children 
    let max = Math.max(maxDepth(root.left), maxDepth(root.right)); 
    // max depth is no. of edged traversed + 1
    return max + 1;
};

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
console.log(maxDepth(root)); //output: 4
