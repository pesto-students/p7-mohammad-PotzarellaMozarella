/*Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, 
find all possible paths from node 0 to node n - 1 and return them in any order.
The graph is given as follows: graph[i] is a list of all nodes you can visit from node i 
(i.e., there is a directed edge from node i to node graph[i][j]).

Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
*/
var allPathsSourceTarget = function(graph) {
    let adjList= {};
    for(let i = 0; i < graph.length; i++) {
        adjList[i] = graph[i];   
    }
    // console.log(adjList);
   let destination = graph.length - 1;
    let visited = [0];
    let stack = [0];
    let result = [], current = 0, path = [];
    while(stack.length){debugger
        // console.log(stack);
        current = stack.pop();
        if (current == destination) {
            result.push([0, ...stack]);
        }
        for( let key of adjList[current]) {
            if(!visited.includes(key)) {
                stack.push(key);
                visited.push(key);
            }
        }
    
    }
    return result;
};
// TC: MxN
// SC: O(N)x5
let graph = [[1,2],[3],[3],[]];
console.log(allPathsSourceTarget(graph)); //output expected: [[0,1,3],[0,2,3]]
// graph = [[4,3,1],[3,2,4],[3],[4],[]];
// console.log(allPathsSourceTarget(graph));