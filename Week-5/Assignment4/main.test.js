//import {mathOperations} from './main';
const mathOperations = require('./main');

//BDD style testing with one main describe block & multiple test blocks
describe("Calculator tests", () => {
    //addition test to pass for correct result  
        test('adding two numbers: 2 & 3 should return 5', () => {
            let result = mathOperations.sum(2,3)
            //assertion
            expect(result).toBe(5);
        });
        
    //difference test to pass for correct result  
        test('difference of two numbers: 5 & 2 should return 5', () => {
            let result = mathOperations.diff(5,-2)
            //assertion
            expect(result).toBe(7);
        });
        
    //multiplication test to pass for correct result  
        test('multiplying two numbers: 2 & 3 should return 6', () => {
            let result = mathOperations.product(2,3)
            //assertion
            expect(result).toBe(6);
        });
        
})



/* tests written to fail

    //addition test to fail for incorrect result 
        test('adding two numbers: 2 & 3 should return 10', () => {
            let result = mathOperations.sum(2,3)
            expect(result).toBe(10);
        });
    //difference test to fail for incorrect result 
        test('difference of two numbers: 7 & 2 should return 6', () => {
            let result = mathOperations.diff(7,2)
            expect(result).toBe(6);
        });
    //multiplication test to fail for incorrect result 
        test('multiplying two numbers: 2 & 3 should return 8', () => {
            let result = mathOperations.product(2,3)
            expect(result).toBe(8);
        });
*/