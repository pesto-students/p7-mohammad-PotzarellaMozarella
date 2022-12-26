const SpiralOrderMatrix = function(matrix) {
    // to check if the array is empty
    if (!matrix.length) return [];

    console.log(`The given matrix is ${matrix}`);
    //initialising result array
    let spiralArr = [];

    //defining the walls of the matrix for traversal via row and column starts and ends
    let rowStart= 0,
    rowEnd= matrix.length-1,
    colStart= 0,
    colEnd= matrix[0].length-1;

    //traversal continues till row start= row end and col start= col end 
    while (rowStart<= rowEnd && colStart<=colEnd) {
            //adding the first row (every 1st, 5th, 9th row...in the spiral)
            for (let i= colStart; i<= colEnd; i++) spiralArr.push(matrix[rowStart][i]);
            //next traversal will happen from the next row of the matrix
            rowStart++;

            //adding the last column (every 2nd, 6th, 10th row...in the spiral)
            for (let i= rowStart; i<= rowEnd; i++) spiralArr.push(matrix[i][colEnd]);
            //next traversal will happen till the previous column of the matrix
            colEnd--;

            //check if we have reached the last row in the matrix
            if(rowStart <= rowEnd) {
                //adding the last row (every 3rd, 7th, 11th row...in the spiral)
                for (let i= colEnd; i>= colStart; i--) spiralArr.push(matrix[rowEnd][i]);
            }  
            //next traversal will happen till the previous row of the matrix        
            rowEnd--;   

            //check if we have reached the last column in the matrix
            if(colStart <= colEnd) {
                //adding the first column (every 4th, 8th, 12th row...in the spiral)
                for (let i= rowEnd; i>= rowStart; i--) spiralArr.push(matrix[i][colStart]);
            }
            //next traversal will happen from the next column of the matrix     
            colStart++;  
    }
    return spiralArr;   
    
}
//TC: O(MN)
//SC: O(MN)

console.log(SpiralOrderMatrix([[ 1, 2, 3 ],[ 4, 5, 6 ],[ 7, 8, 9 ],[ 1, 2, 3 ],[ 4, 5, 6 ],[ 7, 8, 9 ]]));
//output: [1, 2, 3, 6, 9, 3, 6, 9, 8, 7, 4, 1, 7, 4, 5, 8, 2, 5]
console.log(SpiralOrderMatrix([[],[ 4, 5, 6 ],[ 7, 8 ]]));
//output: []