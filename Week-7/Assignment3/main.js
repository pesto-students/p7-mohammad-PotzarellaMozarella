// class to create nodes
class Node {
    constructor(value, next){
        this.value = (value === undefined ? 0 : value);
        this.next = (next === undefined ? null : next);
    }
}

// linkedlist class
class linkedList {
    constructor(){
        debugger;
        this.head = null;
        this.size = 0;
    }
    //to print the linked list
     printList() {
        let curr = this.head;
        let llString ="";
        while(curr) {
            llString += curr.value + " ";
            curr = curr.next;
        }
        console.log(llString);
    }
    // adds an element at the end of list
    append(element){
        // create a new node for the element
        let node = new Node(element);
        // to store current node
        let curr;
        // if list is Empty add the element and make it head
        if(this.head == null) this.head = node;
        // if list is not Empty make the head of the LL the current element and start iterating
        else {
            curr = this.head;
            //iterate until the last node i.e. until the curr.next is null and make it the current element
            while(curr.next){
                curr = curr.next
            }
            //point the pointer of this current(last element) to the newly created node
            curr.next = node;
        }
        // since a node has been added we increase the size of the LL 
        this.size++;
    }
    // detects if the LL has any loops
    detectLoop() {
        let curr = this.head;
        // creates a new node 
        let newNode = new Node();
        // temp variable to store the location of the next pointer for each node while we point each node to the new node
        let temp;
        // iterate over the array to:
        // -store the location of the next pointer for each node to newNode 
        // -find if the pointer of any node is already pointed to the newNode, in which case the loop is closed
        while( curr!=null) {
            if (curr.next == newNode) return "LL contains a loop";
            temp= curr.next;
            curr.next = newNode;
            curr = temp;
        }
        return "LL does not contain a loop"
    }
    // creates a method to create a loop at index 2 to test the detectloop method
    createLoop() {
		let curr = this.head;
		let count = 0;
		while(count != 3) {
			curr = curr.next;
			count++;
		}
		curr.next = this.head;
		return;
	}
    
}
// For finding looped LL
// TC: O(N)
// SC: O(1)

let ll1 = new linkedList();
ll1.append(1);
ll1.append(2);
ll1.append(3);
ll1.append(4);
ll1.append(5);
ll1.append(7);
ll1.printList(); //output: 1 2 3 4 5 7 
console.log(ll1.detectLoop()); //output: LL does not contain a loop

let ll2 = new linkedList();
ll2.append(1);
ll2.append(2);
ll2.append(3);
ll2.append(4);
ll2.append(5);
ll2.append(7);
ll2.printList(); //output: 1 2 3 4 5 7 
ll2.createLoop(); //calling the method to create the test loop
console.log(ll2.detectLoop()); //output: LL contains a loop