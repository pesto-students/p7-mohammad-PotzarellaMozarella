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
        node = new Node(element);
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
    // reverses a linked list
    reverseLL(){
        //initializing the head as the current element and prev and next as null
        let curr = this.head;
        let prev = null;
        let next = null;
        //iterate over the LL until the current element is null, after LL has ended
        while(curr != null) {
            // in every iteration: 
            // next node to be traversed = pointer of the current node
            // pointer of the current node = previous node (since we need to reverse pointers)
            // previous node = current node (as we traverse towards the right of the LL)
            // the current node = next (as we traverse towards the right of the LL)
            next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }   
        // changes the head of the LL to prev once curr is null
        this.head = prev;   
    } 
}
// For reversal of LL
// TC: O(N)
// SC: O(1)

let ll = new linkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.append(5);
ll.append(7);
ll.printList(); //output: 1 2 3 4 5 7 
ll.reverseLL();
ll.printList(); //output: 7 5 4 3 2 1 

/* 
Approach 2:
-Store the nodes(values and address) in the stack until all the values are entered.
-Once all entries are done, Update the Head pointer to the last location(i.e the last value).
-Start popping the nodes(value and address) and store them in the same order until the stack is empty.
-Update the next pointer of last Node in the stack by NULL. 
// TC: O(N)
// SC: O(N)
*/