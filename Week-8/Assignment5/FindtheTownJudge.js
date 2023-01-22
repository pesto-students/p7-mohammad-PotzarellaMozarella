/*
In a town, there are n people labeled from 1 to n. There is a rumor that one of these people is secretly the town judge.
If the town judge exists, then:
The town judge trusts nobody.
Everybody (except for the town judge) trusts the town judge.
There is exactly one person that satisfies properties 1 and 2.
You are given an array trust where trust[i] = [ai, bi] representing that the person labeled ai trusts the person labeled bi.
Return the label of the town judge if the town judge exists and can be identified, or return -1 otherwise.
Input: n = 2, trust = [[1,2]]
Output: 2
*/
var findJudge = function (n, trust) {
    // if there are no persons then there will be no judge
    if (n == 0) return -1;
    // if there is only one person then he will be the judge
    if( n == 1) return n;  
   //created a unidirectional adjacency list with first node in each edge connected to the second node
   // and second node not connected to any node
    adjList = {};
    for( let edge of trust) {
        adjList[edge[0]] ?  adjList[edge[0]].push(edge[1]) : adjList[edge[0]] = [edge[1]];
        adjList[edge[1]] ?  adjList[edge[1]] :  adjList[edge[1]]= [];
    }
    // the possible judge will have an empty array in the adjacency list as they dont trust anyone except themselves
    let possibleJudge;
     for (const key in adjList) { 
        if(adjList[key].length == 0) possibleJudge = key;
    } 
    // if no possible jusdge is found we can return -1
    if( !possibleJudge) return -1;
    // iterate over the adjList to check if all the other keys except the possible judge's key have possible judge present 
    for (const key in adjList) {
        //store the current key's value array in a variable           
        let array = adjList[key];
        //check if the value of any of the keys does not include possible Judge
        if(!array.includes(parseInt(possibleJudge))) { 
             //check if this key is the possible judge itself 
            if(key == possibleJudge) continue;
            else return -1;
        } 
       
    }
    return possibleJudge;
}
//TC: O(N)
//SC: O(N)

let n = 2, trust = [[1,2]];
console.log(findJudge(n, trust)); //output: 2
n = 3, trust = [[1,3],[2,3],[3,1]]
console.log(findJudge(n, trust)); //output: -1
n = 4, trust = [[1,3],[1,4],[2,3],[2,4],[4,3]];
console.log(findJudge(n, trust)); //output: 3
n = 1, trust = [];
console.log(findJudge(n, trust)); //output: 1
