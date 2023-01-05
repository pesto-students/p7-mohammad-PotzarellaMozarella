const sortArray = function(arr) {
    // to check if the array is empty
    if ( arr?.includes(undefined) || arr?.includes(null) || arr?.includes(" ")|| arr==null || arr==undefined){
        if(!Array.isArray(arr)) console.log("input is not an array");
        else console.log("the array has null, undefined or empty arguments");
        return [];
    } 
    // Count the number of 0s, 1s and 2s in the array
    let j = 0, count0 =0, count1 =0, count2=0;
    for(let i=0; i<arr.length; i++) {
        switch (arr[i]) {
            case 0:
                count0++;
                break;
            case 1:
                count1++;
                break;
            case 2:
                count2++;
                break;
            } 
    }
    // Update the original array starting at index j=0
    // Store all the 0s in the beginning of the existing array
    while (count0>0) {
        arr[j]= 0;
        //console.log(arr);
        j++;
        count0--;
    }
    // Store all the 1s in the existing array next
    while (count1>0) {
        arr[j]= 1;
        //console.log(arr);
        j++;
        count1--;
    }
    // Store all the 2s in the existing array next
    while (count2>0) {
        arr[j]= 2;
        //console.log(arr);
        j++;
        count2--;
    }
    
return arr;

}
//TC: O(N)
//SC: O(1)

console.log(sortArray([0,2,1,2,0])); //output: [ 0, 0, 1, 2, 2 ]
console.log(sortArray([0,1,1,1,0])); //output: [ 0, 0, 1, 1, 1 ]
console.log(sortArray([2,2,1,1,0])); //output: [ 0, 1, 1, 2, 2 ]