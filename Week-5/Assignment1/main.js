//3 callback functions that will be called and resolved in order task 1, 2 and 3 using generator function and aync/await function
           async function doTask1() { 
                //prints start of the task1
                console.log("task1 promise pending");
                //returns the result of resolved promise as "task1"
                await new Promise((resolve) => {
                    setTimeout(() => resolve(console.log("task1 promise resolved")), 3000);
                })
            }

            async function doTask2() {
                //prints start of the task2
                console.log("task2 promise pending");
                //returns the result of resolved promise as "task2"
                await new Promise((resolve) => {
                    setTimeout(() => resolve(console.log("task2 promise resolved")), 7000);
                })
            }
            
            async function doTask3() {
                //prints start of the task3
                console.log("task3 promise pending");
                //returns the result of resolved promise as "task2"
                await new Promise((resolve) => {
                    setTimeout(() => resolve(console.log("task3 promise resolved")), 10000);
                })
            }
//calling the 3 async/await functions
doTask1();
doTask2();
doTask3();

//using generator
    function* gen() {
        //calls task1
        yield doTask1()
        //updates the {value: Promise { <pending> }, done: false} and suspends the program until next() is called
        .then()
        .catch((err) => console.log(`Error ${err}`))
        .finally(() => console.log("doTask1 done"));

        //calls task2 when the next() of gen() is called using for of loop below
        yield doTask2()
        //updates the {value: Promise { <pending> }, done: false} and suspends the program until next() is called
        .then()
        .catch((err) => console.log(`Error ${err}`))
        .finally(() => console.log("doTask2 done"));

         //calls task3 when the next() of gen() is called using for of loop below
         yield doTask3()
        //updates the {value: Promise { <pending> }, done: false} and suspends the program since there are no more yeilds
        .then()
        .catch((err) => console.log(`Error ${err}`))
        .finally(() => console.log("doTask3 done"));

        // updates done:true and the loop ends as there is nothing more to yeild
        return;
    }
//calling the generator function to execute the 3 tasks asynchronously
const generatorAsyncFn = gen();
generatorAsyncFn.next(); 
generatorAsyncFn.next();
generatorAsyncFn.next(); 
