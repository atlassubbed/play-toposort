// TODO: move rand* functions into their own package

const randInt = n => Math.floor(Math.random()*n)

const randInsert = (arr, el) => {
  const n = arr.length, i = randInt(n+1);
  if (i === n) arr.push(el);
  else arr.push(arr[i]), arr[i] = el;
  return arr;
}

// could short circuit if num >= arr.length
//   but we'll return a new array instead
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

const print = graph => console.dir(graph, {depth: null});

let curId = 0;

const id = () => ++curId;

module.exports = { 
  randInt, randInsert, randSample,
  isOrdered, resetGraph, print, id,
}
