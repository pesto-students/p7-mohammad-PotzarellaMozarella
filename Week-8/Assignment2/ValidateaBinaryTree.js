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
// assume the minimum and maximum values for the first check to be null
function isValidBST (root, min = null, max = null) { 
    // if node is null then it is a BST
    if(!root) return true;
    // check if the current node's value is within boundaries (min/max)
    if (root.val <= min?.val) return false;
    if (root.val >= max?.val) return false;
    // recursively call 
    // if we go to the left subtree, then we set the current node as the max boundary
    //if we go the right subtree, then we set the current node's value as the min
    return isValidBST(root.left, min, root) && isValidBST(root.right, root, max);
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
console.log(isValidBST(root)); //output: true

let notBST = new BinaryTree();
notBST.insert(5);
notBST.insert(1);
notBST.insert(4);
notBST.insert(null);
notBST.insert(null);
notBST.insert(3);
notBST.insert(6);
let root2 = notBST.getRoot();
console.log(isValidBST(root2)); //output: false
