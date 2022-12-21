/* 
    set is used to remove duplicate elements/ensure uniqueness within the array
    const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
    console.log([...new Set(numbers)])
    prints: [2, 3, 4, 5, 6, 7, 32]
 */

// so if the set of the array and the array itself have the same length then there are no duplicates

hasDuplicate = arr => {
    //addressing edge cases where input array has empty, null or undefined elements
    if (arr.includes(undefined) || arr.includes(null) || arr.includes("")) {
        return "the array has null, undefined or empty arguments";
    }
    else {
        const mySet = new Set(arr);
        return mySet.size !== arr.length ? true : false;
    }
}
console.log(hasDuplicate([1,5,-1,-5])); //false
console.log(hasDuplicate([1,3,-1,3])); //true
console.log(hasDuplicate([2,6,5,5])); //true
console.log(hasDuplicate([null,undefined,null,5])); //the array has null, undefined or empty arguments
console.log(hasDuplicate([ ,1,7,5])); //the array has null, undefined or empty arguments

/* 
    Approach 2: 
   
const hasDuplicate = arr => 
{ 
    if (arr.includes(undefined) || arr.includes(null) || arr.includes(""))
    {
        return "the array has null, undefined or empty arguments";
    }
    else {
        return new Set(arr).size !== arr.length;
    } 
}

*/
