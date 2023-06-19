function createStack() {
    return {
        items: [],
        push(item) {
            this.items.push(item);
        },
        pop() {
            return this.items.pop();
        }
    };
}

const stack = createStack();
stack.push(10); //items:10
stack.push(5); //items:10, 5
stack.pop(); //items:10
stack.items; //items:10
stack.items =[10, 100, 1000];

console.log(stack.items);