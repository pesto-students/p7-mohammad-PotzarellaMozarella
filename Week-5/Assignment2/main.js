//function acception a string as parameter
function vowelCount(str){
    //initiating a Map using new constructor
    const vowelMap = new Map();
    //for to loop over each charachter in the string
    for(let char of str){
        //if the character is included in aeiou (vowels) change the character to lowecase
        if ("aeiou".includes(char)) {
            let lowerCaseChar = char.toLowerCase()
                //if the vowel character is present in the map as key, set its value to increment by 1
                if(vowelMap.has(lowerCaseChar)){
                    vowelMap.set(lowerCaseChar,vowelMap.get(lowerCaseChar)+1);
                }
                //if the vowel character is not present in the map as key, set it as a new key with value as 1
                else{
                vowelMap.set(lowerCaseChar,1);
                }
        }
        
    }
    return vowelMap;
}

//storing the returned Map in a variable
let result = vowelCount("official");

//printing the Map
console.log(result);