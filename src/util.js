// these functions could share:
// forNodeIn(g, doThis);
// if doThis returns false, exit the DFS
const isOrdered = nodes => {
  const seen = {};
  for (let node of nodes){
    const { next, affects } = node;
    seen[node.name] = 1;
    for (let c of next)
      if (seen[c.name]) return false;
    if (affects) for (let c of affects)
      if (seen[c.name]) return false;
  }
  return true;
}

const resetGraph = g => {
  const seen = {}, stack = [g];
  let node;
  while (node = stack.pop()){
    delete node.collapsed
    delete node.collapsing
    delete node._parents
    const { next, affects } = node;
    seen[node.name] = 1;
    for (let child of next)
      if (!seen[child.name])
        stack.push(child);
    if (affects) for (let child of affects)
      if (!seen[child.name])
        stack.push(child)
  }
}

const getAdjMatrix = graph => {
  const is = {}, matrix = [], nodes = graph.nodes;
  // node.name will not necessarily be equal to i-1
  nodes.forEach((n, i) => is[n.name]=i)
  nodes.forEach((n, i) => {
    const { next, affects } = n;
    const row = matrix[i] = Array(nodes.length).fill(0);
    for (let c of next) row[is[c.name]] = 1;
    if (affects) for (let c of affects) row[is[c.name]] = 1;
  })
  return matrix;
}

const print = graph => console.dir(graph, {depth: null});

const printMatrix = m => {
  let out = "";
  m.forEach(row => {
    out += row.map(i => i || ".").join(" ") + "\n"
  })
  console.log(out)
}

let curId = 0;

const id = () => ++curId;

module.exports = { 
  isOrdered, resetGraph, print, printMatrix, id, 
  getAdjMatrix
}
