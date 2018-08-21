const { isOrdered, resetGraph, print, printMatrix, getOutgoingAdjacencyMatrix } = require("./util");
const { genGraph, genForest } = require("./graph");
const { toposortRecur } = require("./sort");
const timer = require("atlas-basic-timer")()

const toposort = graph => {
  const result = toposortRecur(graph);
  resetGraph(graph);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result.reverse())) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}

const f = genForest(2, 3, 10)

const g = genGraph(20, .1, true)

printMatrix(getOutgoingAdjacencyMatrix(g))