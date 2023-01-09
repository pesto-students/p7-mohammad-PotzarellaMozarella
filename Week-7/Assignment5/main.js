/*
Approach2- using map & stack
-push the current element to the stack
-traverse the array from the current element to the last but one element to find the first element that is greater than current element 
-save the current element as key and the greater element it as the value 
-pop the element on finding its greater element, if not then push the next element to the stack
-all elements in the stack have no number greater than them so save their values as -1
*/
const nextGreaterElement = function(arr){
    if (!arr?.length) return "Input array unacceptable"
    // array to store elements as keys in a map with values as their next greater element
    const result = new Map();
    const stack= [];
    // push the first element to stack 
    stack.push(arr[0]);
    // iterate for rest of the elements
    for(let i= 1; i < arr.length ; i++) {
        // if the stack is empty add the next element from the array
        if(stack.length == 0) {
            stack.push(arr[i]);
            // jumps over one iteration in the loop.
            continue;
        }
        // run loop while the stack is not empty & stack top value is lesser that next array element
        while(stack.length !== 0 && stack[stack.length-1] < arr[i]){
            // store the stack element and greater array element as key value pair in map
            result.set(stack[stack.length-1],arr[i]);
            // pop the stack element resolved
            stack.pop();
        }
    // ppush the next element from array to stack for comparison
    stack.push(arr[i]);
    }
    // chech if the stack has any unresolved elements and save their values as -1 in map
    while(stack.length !== 0){
        result.set(stack[stack.length-1],-1);
        // remove element from stack after saving it in map
        stack.pop();
    }
    return result;
}
// TC: O(N)
// TS: O(N)
console.log(nextGreaterElement([6,8,0,1,3])); //output: Map(5) { 6 => 8, 0 => 1, 1 => 3, 3 => -1, 8 => -1 }
console.log(nextGreaterElement([11, 13, 21, 3])); //output: Map(4) { 11 => 13, 13 => 21, 3 => -1, 21 => -1 }
console.log(nextGreaterElement([1,2,3,4])); //output: Map(4) { 1 => 2, 2 => 3, 3 => 4, 4 => -1 }



/*
Approach1- using maps
-store array elements as keys in a map
-traverse the array from the current element to the last element to find the first element that is greater than current element and save it as the value 
-if the current element is the last element or if no number greater than it is found save the value as -1

const nextGreaterElement = function(arr){
    if (!arr?.length) return "Input array unacceptable"
    // array to store elements as keys in a map with values as their next greater element
    const result = new Map();
    //to pick one element at a time and find its next greater
    for(let i=0; i< arr.length; i++) {
        //set the value to -1 if it is the last element in the array
        if(i == arr.length-1) {
            result.set(arr[i],-1);
        }
        else {
            // traverse the array from the current element to the last to find the next greater element and save it as the value
            for(let j= i+1; j< arr.length; j++){
                if(arr[j]>arr[i]) {
                    result.set(arr[i],arr[j]);
                    break;
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
console.log(nextGreaterElement([6,8,0,1,3])); //output: Map(5) { 6 => 8, 8 => -1, 0 => 1, 1 => 3, 3 => -1 }
console.log(nextGreaterElement([11, 13, 21, 3])); //output: Map(4) { 11 => 13, 13 => 21, 21 => -1, 3 => -1 }
console.log(nextGreaterElement([1,2,3,4])); //output: Map(4) { 1 => 2, 2 => 3, 3 => 4, 4 => -1 }
*/