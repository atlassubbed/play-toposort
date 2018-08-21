// test explicit stack vs. recursion
// return false for cyclic graphs
// TODO: ensure all solutions work for
//   * a vector of starting nodes
//   * starting nodes that are children
let sorted;

// if this is implemented with our own stack
// then probably can return ASAP if cyclic.
// Should we prefer avoiding errors? 
const subsort = node => {
  if (node.collapsing) return false;
  node.collapsing = true;
  let next = node.next, n = next.length, child;
  while(n--)
    if (!(child = next[n]).collapsed)
      if (subsort(child) === false) 
        return false;
  node.collapsed = !(node.collapsing = false);
  sorted.push(node);
}

const toposortRecur = node => {
  let nodes = sorted = [];
  const res = subsort(node);
  return res !== false && nodes;
}

const toposortKahn = node => {

}


module.exports = { toposortRecur, toposortKahn }