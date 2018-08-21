const { isOrdered, resetGraph, print } = require("./util");
const { genGraph, genForest, deforestify } = require("./graph");
const { toposortRecur } = require("./sort");
const timer = require("atlas-basic-timer")()

const toposort = graph => {
  const result = toposortRecur(graph);
  resetGraph(graph);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result.reverse())) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const f = genForest(2, 2, 5)

deforestify(f, 10000000)

f[0].nodes = null
f[1].nodes = null

f.forEach(t => print(t))
f.forEach(t => toposort(t))
