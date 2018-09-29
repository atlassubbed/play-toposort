const { isOrdered, resetGraph, print, printMatrix, getAdjMatrix } = require("./util");
const { genGraph, genForest, perturb } = require("./graph");
const { toposortRecur, sortRecur, toposortPerturb, toposortKahn } = require("./sort");
const timer = require("atlas-basic-timer")()

const topoPerturb = g => {
  const result = toposortPerturb(g);
  resetGraph(g);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result)) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const topoDFS = g => {
  const result = toposortRecur(g);
  resetGraph(g);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result)) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const topoKahn = g => {
  const result = toposortKahn(g)
  resetGraph(g);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result)) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const sort = g => {
  const result = sortRecur(g);
  resetGraph(g);
  if (!isOrdered(result)) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const g = genForest(2, 3, 5)

printMatrix(getAdjMatrix(g));
g.roots.forEach(t => printMatrix(getAdjMatrix(t)))
g.roots.forEach(t => {
  console.log(t.nodes.length)
  topoPerturb(t)
})

perturb(g, .02);

printMatrix(getAdjMatrix(g));
g.roots.forEach(t => printMatrix(getAdjMatrix(t)))
g.roots.forEach(t => topoPerturb(t))


// const f = genForest(4, 3, 5)
// f.roots.forEach(t => toposort(t))
// f.roots.forEach(t => sort(t))
// printMatrix(getAdjMatrix(f))
// perturb(f,.05)
// f.roots.forEach(t => toposort(t))
// f.roots.forEach(t => sort(t))
// printMatrix(getAdjMatrix(f, "affects"))
