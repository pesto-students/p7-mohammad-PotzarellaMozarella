const sum3 = function(arr,target) {
    // to address edge cases where input array is empty, null or undefined
    if(!arr?.length) return `Array not acceptable`;
    //initialize sum to calculate sum for 3 indices and closestSum to store the value of the latest/closest sum value so far
    let sum,closestSum= Number.MAX_VALUE; ;  
    //2 for loops to iterate over the array for 3 indices
    for( let i=0; i<arr.length; i++) {
        for( let j=i+1; j<arr.length; j++) {
            for( let k=j+1; k<arr.length; k++) {
                //current sum value being stored
                sum= arr[i]+arr[j]+arr[k]; 
                //check to compare if current sum value or an earlier closestSum value is closer to target
                if(Math.abs(target-closestSum) > Math.abs(target-sum)) {
                    //if check is passed we have a new closestSum to the target
                     closestSum = sum;
                }
            }
        }
        
    }return closestSum;
}
// TC: O(N^3)
// SC: O(1)
console.log(sum3([0,0,0],1)); //output: 0
console.log(sum3([-1,2,1,-4],1)); //output: 2
console.log(sum3([-6,5,5,4],5)); //output: 4
console.log(sum3([-9,1,8,-5],6)); //output: 4 
console.log(sum3([4,0,5,-5,3,3,0,-4,-5],-2)); //output: -2  

