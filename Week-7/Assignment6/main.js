class Queue {
    //initialising 2 stacks to function as a queue together
    constructor() {
        this.s1 = [];
        this.s2 = [];
    }
    //pushes a value to the queue
    push(value) {
        // console.log(value);
        // pushes the value in stack 1 such that last value is at last index
        this.s1.push(value);       
    }
    // transfers elements to stack 2 from stack 1 when a value needs to be popped to enable fifo
    pop(){
        // checks if stacks are empty throws error message
        if(!this.s1.length && !this.s2.length) return "Queue is empty";
        //while stack 1 has any values all values are moved to stack 2 so that the first value pushed becomes the last value in the stack 2
        else if (!this.s2.length) {
            while(this.s1.length) {
                this.s2.push(this.s1.pop());
            }
        }
        // prints the fifo element from the queue
        console.log(this.s2.pop());
    }
} 

function queue(query, value = null) {
    // calls the operations push/pop based on the query input and value
    switch(query) {
        case 1:
            //pushing value into the queue
            q.push(value);
            break;
        case 2:
            //popping value from the queue
            q.pop();
            break;
    }
    
}
// TC: for push O(1), for pop O(N)
// SC: O(N)
queue(1,2);
queue(1,3);
queue(2); //output: 2
queue(1,4);
queue(2); //output: 3