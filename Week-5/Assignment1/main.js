//3 callback functions that will be called and resolved in order task 1, 2 and 3 
function doTask1() {
    //prints start of the task1
    console.log("task1 promise pending");
    //returns the result of resolved promise as "task1"
    return new Promise((resolve) => {
        resolve("task1");
        //prints end of the task1
        console.log("task1 promise fulfilled");
    })
}

function doTask2() {
     //prints start of the task2
    console.log("task2 promise pending");
    //returns the result of resolved promise as "task2"
    return new Promise((resolve) => {
        resolve("task2");
        //prints end of the task2
        console.log("task2 promise fulfilled");
    })
  }
  
function doTask3() {
    //prints start of the task3
    console.log("task3 promise pending");
    //returns the result of resolved promise as "task2"
    return new Promise((resolve) => {
        resolve("task3");
        //prints end of the task3
        console.log("task3 promise fulfilled");
    })
}

//using generator
    function* gen() {
        //calls task1
        doTask1();
        //updates the {value: "task1", done: false} and suspends the program until next() is called
        yield "task1";

        //calls task2 when the next() of gen() is called using for of loop below
        doTask2();
        //updates the {value: "task2", done: false} and suspends the program until next() is called
        yield "task2";

         //calls task3 when the next() of gen() is called using for of loop below
        doTask3();
        //updates the {value: "task3", done: false} and suspends the program since there are no more yeilds
        yield "task3";

        // updates done:true and the loop ends as there is nothing more to yeild
        return;
    }
////calling the generator function to execute the 3 tasks asynchronously
console.log("==3 callback functions asynchrously executed using generator==");
        //for of loop used to keep calling the next() value in the gen())everytime it is paused due to yeild
        for (const val of gen()) {
            console.log(val);
        }


//using async/await
async function asyncAwait () {
    console.log("==3 callback functions asynchrously executed using async/await==");

    //waits for resolveAfter1Seconds() to execute and complete
    const task1 = await doTask1();
    // this prints returned value after resolveAfter1Seconds() is completed
    console.log(task1); // output: fast

    //waits for resolveAfter2Seconds() to execute and complete
    const task2 = await doTask2();
    // this prints returned value after resolveAfter2Seconds() is completed
    console.log(task2); // output: medium

    // waits for resolveAfter3Seconds() to execute and complete
    const task3 = await doTask3();
    // this prints returned value after resolveAfter3Seconds() is completed
    console.log(task3); // output: slow
   
} 
//calling the aync function to execute the 3 tasks asynchronously
asyncAwait();

