/* 
    set is used to remove duplicate elements/ensure uniqueness within the array
    const numbers = [2,3,4,4,2,3,3,4,4,5,5,6,6,7,5,32,3,4,5]
    console.log([...new Set(numbers)])
    prints: [2, 3, 4, 5, 6, 7, 32]
 */

// so if the set of the array and the array itself have the same length then there are no duplicates

hasDuplicate = MyArray =>  {
    const mySet = new Set(MyArray);
    return mySet.size !== MyArray.length ? true : false ;
}

console.log(hasDuplicate([1,5,-1,-5])); //false
console.log(hasDuplicate([1,3,-1,3])); //true
console.log(hasDuplicate([2,6,5,5])); //true

/* 
    Approach 2: 
    const hasDuplicate = arr => new Set(arr).size !== arr.length

*/
