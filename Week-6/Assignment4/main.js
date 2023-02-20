const stockProfit = function(priceArr) {
    // to address edge cases where input array is empty, null or undefined
    if(!priceArr?.length) return 0;
    // initialize minimum price to be at index 0 and profit 0
    let minPrice = priceArr[0];
    let maxProfit = 0;
    //traversing the array from one position ahead at index 1 until the last index
    for (let i =1; i <priceArr.length-1; i++) {
        //reassigning if a price lesser than current minPrice is found
        minPrice= Math.min(minPrice, priceArr[i]);
        //reassigning if a profit more than current maxProfit is found
        maxProfit= Math.max(maxProfit, priceArr[i]-minPrice);
    }
    //returning the highest profit found
    return maxProfit;
}
//TC: O(N)
//SC: O(N)
console.log(stockProfit([7,1,5,3,6,4])); //output: 5
console.log(stockProfit([7,6,4,3,1])); //output: 0
console.log(stockProfit([7,3,6,3,6,4])); //output: 3
console.log(stockProfit([9,17,5,3,6,4])); //output: 8
console.log(stockProfit([])); //output: 8
console.log(stockProfit([null])); //output: 8

/*
Approach 2: 
-Traversing the array twice- one for the day to buy and one for the day to sell. 
-Check for the day of sale to be after the day of buy
-Store the values of profit or loss found in sum and the highest value so far to MaxProfit

const stockProfit = function(priceArr) {
    let sum=0, MaxProfit=0;
    for (let i =0; i <priceArr.length-1; i++) {
        for( let j=i+1; j<priceArr.length; j++) {
            sum= priceArr[j]-priceArr[i] ;
            // 
            if ( sum > MaxProfit && i<j) {
                MaxProfit= sum;     
            } 
            
        }
    }
    return MaxProfit;
}
//TC: O(N^2)
//SC: O(N)
*/