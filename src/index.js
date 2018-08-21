const { isOrdered, resetGraph, print, printMatrix, getAdjMatrix } = require("./util");
const { genGraph, genForest, perturb } = require("./graph");
const { toposortRecur } = require("./sort");
const timer = require("atlas-basic-timer")()

const toposort = graph => {
  const result = toposortRecur(graph);
  resetGraph(graph);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result.reverse())) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const f = genForest(4, 3, 5)
f.roots.forEach(t => toposort(t))
printMatrix(getAdjMatrix(f))
perturb(f,.5)
printMatrix(getAdjMatrix(f))
f.roots.forEach(t => toposort(t))

const g = genGraph(2000, .5)

toposort(g)