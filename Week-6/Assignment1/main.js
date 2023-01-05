const maxSubArray = function (arr) {
    if ( arr?.includes(undefined) || arr?.includes(null) || arr?.includes(" ")|| arr==null || arr==undefined){
        if(!Array.isArray(arr)) console.log("input is not an array");
        else console.log("the array has null, undefined or empty arguments");
        return [];
    } 
    else {
        //initializing the maxumum sum to be negative of infinity as it will be eventually higher than that if the array has all intergers
    let maxSumSoFar= -Infinity;
    //initializing the sum counter to be 0
    let sum = 0;
    //running a loop through the array to add the sum of each number to the counter
    for (let i =0;i<arr.length;i++) {
        //adding the integer at current index to the sum counter
        sum+= arr[i];
        //checking for max value and assignning the larger of the two values to the maxSumSoFar to be returned as result
        maxSumSoFar= Math.max(sum, maxSumSoFar);
        //if the starting number is negative or the sum changes to negative we need to reset the sum value to calculate the possible max sum that comes next
        if(sum<0) {
            sum=0;
        }
    }
    return maxSumSoFar;
    } 
};

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
//output:6
console.log(maxSubArray([1, 2, 3, 4, -10]));
//output:10 
console.log(maxSubArray([5,4,-1,7,8]));
//output:23 
console.log(maxSubArray([undefined]));
//output:1 the array has null, undefined or empty arguments []
console.log(maxSubArray(null));
//output:input is not an array [] 