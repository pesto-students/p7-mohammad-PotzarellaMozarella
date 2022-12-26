const sortArray = function(arr) {
    // to check if the array is empty
    if (!arr.length) return [];
    // initilizing array for sorted result
    let sortedArray = []; 
    //creating a map to save occurences of 0,1 & 2 in the array
    let count = new Map([[0, 0],[1, 0],[2, 0]]);

    //loop to count and save occurences of 0,1 & 2 in the array
    for (let i=0; i<arr.length; i++) {
        //increment if the number is present in the map, i.e the number is 0, 1 or 2
        if(count.has(arr[i])) {
            count.get(arr[i]); 
            count.set(arr[i], count.get(arr[i]) + 1 || 1);
        }

    }
    //initilizing index of the sorted result array
    let a=0;
    //running a loop over the map to save 0,1 & 2s depending on the umber of their occureneces as per the map values
    for (let [key, value] of  count.entries()) {
        //to check ensure the occurence isnt 0
        if(value !=0) {
            //loop to save teh digit as per its number of ccurences
            for(let i=0; i<=value; i++) {
            //saving the key as the array element at present index
            sortedArray[a]= key;
            //change the index
            a++;
        }
        }
        
    }

return sortedArray;
}
//TC: O(N)
//SC: O(C)

console.log(sortArray([0,2,1,2,0])); //output: [ 0, 0, 0, 1, 1, 2, 2, 2]
console.log(sortArray([0,1,1,1,0])); //output: [0, 0, 0, 1, 1, 1, 1]
console.log(sortArray([2,2,1,1,0])); //output: [0, 0, 1, 1, 1, 2, 2, 2]