const parenthesisChecker = function(string){
    if(!string?.length) return "Input string unacceptable"
    // if there is an odd number, it means that at least one bracket is missing a pair
    if(string.length % 2 !== 0) return false
    // if the first element is a closing bracket, it will never have a pair
    if(string[0] =="}" || string[0] ==")" || string[0] =="]") return false;
    // same goes for last element, we are just dealing with opening bracket
    if(string[string.length-1] =="{" || string[string.length-1] =="(" || string[string.length-1] =="[") return false;

    //create a new stack to store brackets from the string
    let stack= [];
    for(let i=0; i<string.length; i++){
        let x = string[i];
        //if the opening brackets of any kind occur they are added to the new stack and we continue with the next iteration in the loop
        if( x =="{" || x =="(" || x =="[") {
            stack.push(x);
            continue;
        }

        //if the stack is empty this will return false
        if(!stack?.length) {
            return false;
            break;
        }

        //we pop the next elements after opening brackets-
        // -check if the top of the stack is matching with it's pair
        // - if no match is found, it's impossible to close the bracket so return false
        let check;
        switch(x) {
            case "}":
                check = stack.pop();
                if(check== "[" || check== "(" || !check) return false;
                break;
            case "]":
                check = stack.pop();
                if(check== "{" || check== "(" || !check) return false;
                break;
             case ")":
                check = stack.pop();
                if(check== "[" || check== "{" || !check) return false;
                break;
        }
    }
    return stack.length==0;
}
// TC: O(N)
// SC: 0(N)
console.log(parenthesisChecker("()))")); //output: false
console.log(parenthesisChecker("([{}])")); //output: true
console.log(parenthesisChecker("()[]{}")); //output: true
console.log(parenthesisChecker("(]")); //output: false
console.log(parenthesisChecker("")); //output: Input string unacceptable
console.log(parenthesisChecker(" ")); //output: false