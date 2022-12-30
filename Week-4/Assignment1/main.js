//storing the three states of promise in an object
const promiseState = {
    pending: "pending",
    resolved: "resolved",
    rejected: "rejected"
};

//creating a custom class for promise
class customPromise {
    constructor(callback) {
        // Initial state of Promise is empty
        this.promiseState = promiseState.pending; 
        //Using “bind” to bind the callback functions sent as props
        this.resolve = this.resolve.bind(this);
        this.reject = this.reject.bind(this);
        // Invoke callback by passing the _resolve and the _reject function of our class
        callback(this.resolve, this.reject); 
        // Initial state of the function that executes on resolve is empty
        this.thenFn = null;
        // Initial state of the function that executes on reject is empty
        this.thenCatch = null;  
    }
    /*resolve method:
     -gets the resolved result from getNumber if random number isnt divisible by 5
     -sends it to then then method if the promise state is pending
     -changes the state of the promise to resolved
     */
    resolve(resolvedResult) {
        if (this.promiseState === promiseState.pending) {
            this.thenFn && this.thenFn(resolvedResult);
        }
        this.promiseState = promiseState.resolved;
    }
    /*reject method:
     -gets the rejected result from getNumber if random number is divisible by 5
     -sends it to then catch method if the promise state is pending
     -changes the state of the promise to rejected
     */
    reject(rejectedResult) {
        if (this.promiseState === promiseState.pending) {
            this.catchFn && this.catchFn(rejectedResult);
        }
        this.promiseState = promiseState.rejected;
    }
    /*then method:
     -gets the resolved result from getNumber if random number isnt divisible by 5
     -updates the thenFn to point to the handler passed during initialization 
     -returns thenFn as display function for resolution handling
     */
    then(thenFn) {
        this.thenFn = thenFn;
        return this;
    }
    /*catch method:
     -gets the rejected result from getNumber if random number is divisible by 5
     -updates the catchFn to point to the handler passed during initialization
     -returns thenFn as display function for error handling
     */
    catch(catchFn) {
        this.catchFn = catchFn;
        return this;
    }
};
    
const getNumber = () => 
    new customPromise((resolve, reject) => {
        //picking a random number between 0-1000
        let randomNumber = Math.floor(Math.random() * 100);
        //if number is divisible by 5 reject else resolve promise within a variable time interval
        setTimeout(()=> { 
            if (randomNumber%5 === 0) {
                reject(`Rejected the number ${randomNumber}`);
            }
            else {
                resolve(`Resolved the number ${randomNumber}`);
            }
        }, randomNumber * 100) //time for resolution and rejection time as varialble
    });

//function to print the result received as content for resolve or reject from methods in customPromise
const display = (content) => {
    console.log(content);
}

//sending the display function to be passed as thenFn & catchFn in the customPromise to resole/reject the promise
const getResult= getNumber(); 
getResult.then(display)
.catch(display)

