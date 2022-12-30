const difference = function(arr, diff) {
    if ( arr?.includes(undefined) || arr?.includes(null) || arr?.includes(" ")|| arr==null || arr==undefined){
        if(!Array.isArray(arr)) console.log("input is not an array");
        else console.log("the array has null, undefined or empty arguments");
        return [];
    } 
    //create a map to store the number of occurences of each number in the array
    let mp= new Map();

    //count the number of occurences and store them as values in the Map-mp
    for (let i=0; i<arr.length; i++) {
        if(mp.has(arr[i])) {
            mp.set(arr[i], mp.get(arr[i]) + 1 );//|| 1
        }
        else mp.set(arr[i], 1); 
        // check if difference is zero and we are able to find any duplicate then such a pair exists
        if(diff==0 && mp.get(arr[i])>1) return 1;
    }
    // check if difference is zero and we are unable to find any duplicate or element whose frequency is greater than 1 then no such pair found
    if(diff==0) return 0;

    //traverse the array to see if the sum of array element and difference n is present 
    for (let i=0; i<arr.length; i++) {
        if(mp.has(diff + arr[i])) {
            console.log("Pair found");
            return 1;
        }
        
    }  
    console.log("Pair not found");
    return 0;
}

//TC: O(N)
//SC: O(N)

console.log(difference([-10, 20], 30)); 
//output: 1
console.log(difference([1, 8, 30, 40, 100], -60));
//output: 1
console.log(difference([5, 10, 3, 2, 50, 80], 78));
//output: 1
console.log(difference([90, 70, 20, 80, 50], 45));
//output: 0
console.log(difference([5, 20, 3, 2, 50, 80], 78));
//output: 1
console.log(difference([null], 30)); 
//output: the array has null, undefined or empty arguments []
console.log(difference(undefined, 30)); 
//output: input is not an array []

