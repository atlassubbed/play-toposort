const { id, getAdjMatrix } = require("./util");
const { insert, int } = require("atlas-random");

// Sum((d/2)^i)[0,h-1] ~ (d/2)^h-1 time
const genTree = (h, d, _root) => {
  if (!h) return null;
  const n = {name: id(), next: [], affects: [], affectors: 0};
  if (!_root) n.nodes = [_root = n];
  else _root.nodes.push(n)
  let deg = int(d+1), next = n.next;
  if (--h && deg) while(deg--) 
    next.push(genTree(h,d,_root))
  return n
}
const genForest = (n, h, d) => {
  const roots = [], name = id(), nodes = [];
  while(n--) {
    const tree = genTree(h, d);
    roots.push(tree)
    nodes.push(...tree.nodes)
  }
  return {name, roots, nodes};
}
// ~ n^2 time
const perturb = (g, p, cyclic) => {
  const index = {}, nodes = g.nodes, n = nodes.length;
  nodes.forEach((n, i) => index[n.name]=i)
  const adj = getAdjMatrix({nodes});
  for (let i = 0, parent, next; i < n; i++){
    next = (parent = nodes[i]).affects
    for (let j = cyclic ? 0 : i+1, child; j < n; j++){
      if (j === i) continue;
      const adjI = index[parent.name];
      const adjJ = index[(child = nodes[j]).name];
      if (!adj[adjI][adjJ] && Math.random() < p){
        next.push(child)
        child.affectors++
      }
    }
  }
}

// n time
const genSingletons = n => {
  const nodes = [];
  while(n--) nodes.push({name: id(), next: [], parents: 0});
  return (nodes[0].nodes = nodes)[0];
}

// ~ n^2 time
const genGraph = (n, p, cyclic) => {
  const g = genSingletons(n), nodes = g.nodes
  for (let i = 0, parent, next; i < n; i++){
    next = (parent = nodes[i]).next
    for (let j = cyclic ? 0 : i+1; j < n; j++)
      if (j !== i && Math.random() < p){
        nodes[j].parents++;
        insert(next, nodes[j]);
      }
  }
  return g;
}

module.exports = { genGraph, genForest, perturb }
