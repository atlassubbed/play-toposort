const { randInsert, id, randInt, randSample, cannotReach } = require("./util");

// n time
const genSingletons = n => {
  const nodes = [];
  while(n--) nodes.push({name: id(), next: []});
  return (nodes[0].nodes = nodes)[0];
}

// Sum((d/2)^i)[0,h-1] ~ (d/2)^h-1 time
const genTree = (h, d, _root) => {
  if (!h) return null;
  const n = {name: id(), next: [], alt: []};
  if (!_root) n.nodes = [_root = n];
  else _root.nodes.push(n)
  let deg = randInt(d+1), next = n.next;
  if (--h && deg) while(deg--) 
    next.push(genTree(h,d,_root))
  return n
}

// ~ n^2 time
const genGraph = (n, p, acyclic) => {
  const g = genSingletons(n), nodes = g.nodes
  for (let i = 0, parent, next; i < n; i++){
    next = (parent = nodes[i]).next
    for (let j = acyclic ? i+1 : 0; j < n; j++)
      if (j !== i && Math.random() < p)
        randInsert(next, nodes[j]);
  }
  return g;
}

const genForest = (n, h, d) => {
  const forest = [];
  while(n--) forest.push(genTree(h, d));
  return forest;
}

// TODO: The better thing to do is to compute the adjacency matrix
//   and then switch random zeros to one in the upper-triangular matrix
//   since we still want an acyclic graph (we'll keep a hashtable of nodes)
//   Then, this will be O(n) in the number of superfluous edges.
// e.g. const deforestify = (forest, numSuperfluousEdges) => {...}
const deforestify = (forest, coDeg) => {
  const n = forest.length;
  // forward pass, create edges LTR
  for (let i = 0, nodes; i < n; i++){
    nodes = forest[i].nodes;
    for (let j = i+1; j < n; j++){
      const subset = randSample(nodes, coDeg);
      for (let node of subset)
        node.next.push(randSample(forest[j].nodes));
    }
  }
}

module.exports = { genGraph, genForest, deforestify }
