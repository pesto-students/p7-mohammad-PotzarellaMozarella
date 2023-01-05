//approach1
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

//approach2
const threeSum = function(arr,target) {
    // to address edge cases where input array is empty, null or undefined
    if(!arr?.length) return `Array not acceptable`;
    let closestSum= arr[0]+ arr[1]+ arr[arr.length-1];
    arr = mergeSort(arr);
    // arr.sort((a, b) => a - b);
    for(let i=0; i < arr.length - 2; i++) {
        let start= i+1, end= arr.length-1;
        // continue if start is smaller than end
        while(start < end) {
            let sum = arr[i] + arr[start] + arr[end];
            //if the value of the sum is lesser than target then the sum needed is lesser hence we move the end towards the start of sorted arr
            if(sum > target) {
                end--;
            }
            //if the value of the sum is greater than target then the sum needed is larger hence we move the start towards the end of sorted arr
            else {
                start++;
            }
            if(Math.abs(closestSum - target) > Math.abs(sum - target)) {
                //if check is passed we have a new closestSum to the target
                closestSum = sum;
            }
        }
    } return closestSum;
} 

function mergeSort(arr) {
    if(arr.length<=1) return arr;
    //break the input array into starting, mid and end points
    //picking the mid index point of the array
    const mid = Math.floor((arr.length)/2);
    // console.log(arr);
    //recursively further breaking down the left/first half of the array until its a single element
    const left = mergeSort(arr.slice(0,mid));
    //recursively further breaking down the right/second half of the array until its a single element
    const right = mergeSort(arr.slice(mid));
    //merge the temp arrays back into arr[left..right]
    return merge(left, right);
}  
function merge(left, right) {
    // console.log(left);console.log(right);
    //array for the resultant sorted array
    let sortedArr =[];
    //loop to run until left or right arrays have elements left
    while(left?.length && right?.length) {
        //shift the element from left array to sortedArray if its smaller than the next right array element
        if(left[0]<right[0]) {
            sortedArr.push(left.shift());
        }
        //shift the element from right array to sortedArray if its smaller than the next left array element
        else {
            sortedArr.push(right.shift());
        }
    }//if eithre left or right array run out of elements
    // copy the remaining elements of left[], if there are any
    while(left?.length) {
        sortedArr.push(left.shift());
    }
    // copy the remaining elements of right[], if there are any
    while(right?.length){
        sortedArr.push(right.shift());
    }
    return sortedArr;
} 
//TC: O(N^2)
//SC: O(N)
console.log(threeSum([0,0,0],1)); //output: 0
console.log(threeSum([-1,2,1,-4],1)); //output: 2
console.log(threeSum([-6,5,5,4],5)); //output: 4
console.log(threeSum([-9,1,8,-5],6)); //output: 4 
console.log(threeSum([4,0,5,-5,3,3,0,-4,-5],-2)); //output: -2 