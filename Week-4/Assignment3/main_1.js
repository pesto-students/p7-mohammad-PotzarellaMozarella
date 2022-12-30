// Fib is the function returning an object literal which will be iterable 
// n is the number of digits to be printed in the series

const Fib = (n) => ({   //an iterable object that has method Symbol.iterator 

        [Symbol.iterator]: ()=> {

        let i = 1;   //the counter being at 1 since 0 is stored as the initial value
        let old = 0, new1 = 0;   //initiating the 1) the counter for addition & 2) first number of the series
        
        // returns an iterator object
        return { 
            next: ()=> {    //next method of the object iterator 
                if (i <= n) {     //to check if we have reached nth number in the series
                    i++;
                    [old, new1] = [new1, (old + new1)|| 1]; //updating the state to next value
                   
                    return { value: old , done: false }; //to return the next value
                }
                else {
                    return {done: true};  //signal when the series is done upto n by returning done is true
                }   
                
            }
        };
    
    },
    
})    
  

//print the series uptil the given n
console.log(`The fibonacci series is:`);

/*
the For of loop 
    -takes the iterable object method [Symbol.iterator]()
    -keeps running while (!iterator.next().done) {
         -assigns the next value in the series
        }
    -ends the loop when (iterator.next().done == true)   
*/
for (const n of [...Fib(5)]) { 
    console.log(n);
}
