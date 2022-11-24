function createStack() {
    let items= [];
    function push(item) {
        this.items.push(item);
    };
    function pop() {
        return this.items.pop();
    };
    //console.log(items);
    return items;
}

const stack = createStack();
stack.push(10);
stack.push(5); 
stack.pop(); //5
stack.items; //undefined


//console.log(stack.items); 