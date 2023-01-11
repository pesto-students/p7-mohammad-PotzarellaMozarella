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
    // rotates a linked list by given index
    rotateLL(shift){
        //initializing the variables to store current pointer, count for index, and oldHead, newEnd and newHead for the change due to rotation
        let curr = this.head;
        let count = 1;
        let oldHead = this.head, newEnd, newHead;
        //iterate over the LL until the end of the LL until the end
        while(count <= this.size) {
            //at the index of shift store the current node as the new ending node and the next node as the new head for LL
            if(count == (shift)) {
                newEnd = curr;
                newHead = curr.next;
            }
            //at the last index change the pointer from null to point to the old head node 
            if(curr.next == null){
                curr.next = oldHead;//6.next=null so  6.next=this.head=1
            }
            //change the current node and increase count
            curr = curr.next;          
            count++;
        }  
        //at the end of iteration change the pointer of new end note to null and this.head points to the newHead
        newEnd.next = null;
        this.head = newHead;
    } 
}
// For rotation of LL
// TC: O(N)
// SC: O(1)

let ll = new linkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.append(4);
ll.append(5);
ll.append(6);
ll.printList(); //output: 1 2 3 4 5 6
ll.rotateLL(3);
ll.printList(); //output: 4 5 6 1 2 3 
ll.rotateLL(2);
ll.printList(); //output: 6 1 2 3 4 5 
ll.rotateLL(5);
ll.printList(); //output: 5 6 1 2 3 4 