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
stack.push(10); //item added: 10
stack.push(5);  //item added: 5
stack.pop(); // //item removed: 5
stack.items; //undefined- items not accessible outside CreateStack due to closure


//console.log(stack.items); 