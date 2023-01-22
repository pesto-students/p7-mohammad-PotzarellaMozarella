var validPath = function(n, edges, source, destination) {
    // convert edgelist to adjacency list
    let adj = {};
    for (let edge of edges) {
        //if the node doest exists in adjacency list then create a key and add the other node in its respective value array
        adj[edge[0]] ? adj[edge[0]].push(edge[1]) : adj[edge[0]] = [edge[1]];
        adj[edge[1]] ? adj[edge[1]].push(edge[0]) : adj[edge[1]] = [edge[0]];
    }
    // creates a Set to store visited nodes
    let visited = new Set;
    // creates stack to push neighboring nodes in and pop them out as they are visited
    let stack = [source];
    // begin iteration and visiting with the source node
    visited.add(source);
    // iterate till stack has nodes
    while(stack.length) {
        //remove the current node from the stack to check if it is the destination
        //if not iterate over neighboring nodes of the current node and add them to stack if not visited 
        let currNode = stack.pop();
        //if the current node is the destination then a path exists 
        if(currNode == destination) return true;
        for (let i = 0; i < adj[currNode].length; i++){debugger
            let key = adj[currNode][i].toString();
            if(!visited.has(key)) {
                stack.push(key);
                visited.add(key);
            }
        }
    } return false;
};
// TC: O(N)
// SC: O(N)
let n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2;
console.log(validPath(n, edges, source, destination)); // Output: true
n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5;
console.log(validPath(n, edges, source, destination)); // Output: false