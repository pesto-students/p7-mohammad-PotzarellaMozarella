/*
Approach1- using maps
-store array elements as keys in a map
-traverse the array from the current element to the last element to find the first element that is greater than current element and save it as the value 
-if the current element is the last element or if no number greater than it is found save the value as -1
*/
const nextGreaterElement = function(arr){
    // array to store elements as keys in a map with values as their next greater element
    const result = new Map();
    //to pick one element at a time and find its next greater
    for(let i=0; i< arr.length-1 ; i++) {
        //set the value to -1 if it is the last element in the array
        if(i == arr.length-1) {
            result.set(arr[i],-1);
        }
        else {
            // traverse the array from the current element to the last but one element to find the next greater element and save it as the value
            for(let j= i+1; j< arr.length-1; j++){
                if(arr[j]>arr[i]) {
                    result.set(arr[i],arr[j]);
                    continue;
                }
            }
            //if any element doest exist in the map as key, save its value as -1
            if(!result.has(arr[i])){
                result.set(arr[i],-1);
            }
        }
    }
    return result;
}
// TC: O(N^2)
// TS: O(N)
console.log(nextGreaterElement([6,8,0,1,3]));