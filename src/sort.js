// test explicit stack vs. recursion
// return false for cyclic graphs
// TODO: ensure all solutions work for
//   * a vector of starting nodes
//   * starting nodes that are children
let sorted, stack;

// if this is implemented with our own stack
// then probably can return ASAP if cyclic.
// Should we prefer avoiding errors? 


// DFS toposort
const postsort = node => {
  if (node.collapsing) return false;
  node.collapsing = true;
  let { next } = node;
  for (let c of next)
    if (!c.collapsed)
      if (postsort(c) === false)
        return false;
  node.collapsed = !(node.collapsing = false);
  sorted.push(node);
}
const toposortRecur = node => {
  let nodes = sorted = [];
  const res = postsort(node);
  return res !== false && nodes.reverse();
}



// Kahn toposort
// this is broken, since you must travel the entire DAG
// if you miss a root node, you'll get the (wrong) sorted subset
// so "node" should be "list of all in-deg-zero nodes"
const toposortKahn = node => {
  const sorted = [], stack = [node];
  node._parents = 0;
  while(node = stack.pop()){
    sorted.push(node);
    for (let c of node.next){
      if (c._parents == null){
        c._parents = c.parents - 1;
      } else if (c._parents === 0){
        return false;
      } else {
        c._parents = c._parents - 1;
      }
      if (!c._parents) stack.push(c);
    }
  }
  return sorted;
}

// DFS naive sort
const presort = node => {
  let { next, affects } = node;
  sorted.push(node), node.collapsed = true;
  for (let c of next)
    if (!c.collapsed) presort(c);
}
const sortRecur = node => {
  let nodes = sorted = [];
  presort(node);
  return nodes;
}



const perturbsort = node => {
  if (node.collapsing) 
    throw new Error("cyclic entanglement");
  node.collapsing = true;
  let { next, affects, affectors } = node;
  for (let c of next)
    if (!c.collapsed) perturbsort(c);
  for (let c of affects)
    if (!c.collapsed) perturbsort(c);
  node.collapsed = !(node.collapsing = false);
  if (node.affectors || node.affects.length || node.isOrigin)
    sorted.push(node);
}
const toposortPerturb = node => {
  sorted = [];
  node.isOrigin = true;
  perturbsort(node);
  return sorted.reverse();
}

module.exports = { sortRecur, toposortRecur, toposortPerturb, toposortKahn }
