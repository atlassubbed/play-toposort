const { randInsert, id, randInt } = require("./util");

// n^2/2 ~ n^2 time
const genDAG = (n, p) => {
  const nodes = [];
  for (let i = 0; i < n; i++){
    const parent = {name: i}, next = [];
    for (let j = 0; j < i; j++)
      if (Math.random() < p) 
        randInsert(next,nodes[j]);
    parent.next = next;
    nodes.push(parent);
  }
  return nodes.pop();
}

// n^2 time
const genDG = (n, p) => {
  const nodes = [];
  for (let i = 0; i < n; i++) 
    nodes.push({name:i});
  for (let i = 0; i < n; i++){
    const parent = nodes[i], next = [];
    for (let j = 0; j < n; j++)
      if (j !== i && Math.random() < p)
        randInsert(next, nodes[j]);
    parent.next = next;
  }
  return nodes.pop();
}

// Sum((d/2)^i)[0,h-1] ~ (d/2)^h-1 time
const genTree = (h, d) => {
  if (!h) return null;
  const next = [], name = id();
  let deg = randInt(d);
  if (--h && deg) while(deg--) 
      next.push(genTree(h, d));
  return {name, next}
}

module.exports = { genDG, genDAG, genTree }
