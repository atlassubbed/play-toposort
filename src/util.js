const randInt = n => Math.floor(Math.random()*(n+1))

const randInsert = (arr, el) => {
  const n = arr.length, i = randInt(n);
  if (i === n) arr.push(el);
  else arr.push(arr[i]), arr[i] = el;
}

const nodeCount = graph => {
  const nodes = [graph], seen = {};
  let count = 1, node, name, next;
  while (node = nodes.pop())
    if (next = node.next)
      for (let child of next)
        if (!seen[name = child.name])
          count += (seen[name] = 1), nodes.push(child);
  return count;
}

const isOrdered = nodes => {
  const n = nodes.length, seen = {};
  let node, name, next;
  for (let i = 0; i < n; i++){
    seen[(node = nodes[i]).name] = 1;
    if (next = node.next)
      for (let child of next)
        if (seen[child.name]) return false;
  }
  return true;
}

let curId = 0;

const id = () => ++curId;

module.exports = { nodeCount, isOrdered, id, randInsert, randInt }
