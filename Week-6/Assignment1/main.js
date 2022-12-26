const maxSubArray = function (A) {
    //initializing the maxumum sum to be negative of infinity as it will be eventually higher than that if the array has all intergers
    let maxSumSoFar= -Infinity;
    //initializing the sum counter to be 0
    let sum = 0;
    //running a loop through the array to add the sum of each number to the counter
    for (let i =0;i<A.length;i++) {
        //adding the integer at current index to the sum counter
        sum+= A[i];
        //checking for max value and assignning the larger of the two values to the maxSumSoFar to be returned as result
        maxSumSoFar= Math.max(sum, maxSumSoFar);
        //if the starting number is negative or the sum changes to negative we need to reset the sum value to calculate the possible max sum that comes next
        if(sum<0) {
            sum=0;
        }
    }

    return maxSumSoFar;
};
//TC: O(N)
//SC: O(C)

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
//output:6
console.log(maxSubArray([1, 2, 3, 4, -10]));
//output:10 
