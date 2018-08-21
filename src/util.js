// TODO: move rand* functions into their own package

const randInt = n => Math.floor(Math.random()*n)

const randInsert = (arr, el) => {
  const n = arr.length, i = randInt(n+1);
  if (i === n) arr.push(el);
  else arr.push(arr[i]), arr[i] = el;
  return arr;
}

// this isn't a formal package or anything
// so returning the input is fine...
const randSample = (arr, size) => {
  let n = arr.length;
  if (!size) return arr[randInt(n)];
  if (n <= size) return arr;
  const sample = [];
  for (let i = 0; i < n; i++){
    if (i < size) sample.push(arr[i]);
    else if (Math.random() < size/(i+1))
      sample[randInt(size)] = arr[i];
  }
  return sample;
}

// these functions could share:
// forNodeIn(g, doThis);
// if doThis returns false, exit the DFS
const isOrdered = nodes => {
  const n = nodes.length, seen = {};
  let node, name, next;
  for (let i = 0; i < n; i++){
    seen[(node = nodes[i]).name] = 1;
    for (let child of node.next)
      if (seen[child.name]) return false;
  }
  return true;
}

const resetGraph = graph => {
  const seen = {}, stack = [graph];
  let node, next;
  while (node = stack.pop()){
    delete node.collapsed, delete node.collapsing;
    seen[node.name] = 1, next = node.next;
    for (let child of next)
      if (!seen[child.name])
        stack.push(child);
  }
}

const getAdjMatrix = graph => {
  const index = {}, matrix = [], nodes = graph.nodes;
  // node.name will not necessarily be equal to i-1
  nodes.forEach((n, i) => index[n.name]=i)
  nodes.forEach((n, i) => {
    const row = matrix[i] = Array(nodes.length).fill(0);
    n.next.forEach((m, j) => {
      row[index[m.name]] = 1
    })
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
  randInt, randInsert, randSample,
  isOrdered, resetGraph, print, printMatrix, id, 
  getAdjMatrix
}
