const { nodeCount, isOrdered } = require("./util");
const { genDG, genDAG, genTree } = require("./graph");
const { toposortRecur } = require("./sort");
const timer = require("atlas-basic-timer")()

const toposort = graph => {
  const result = toposortRecur(graph);
  if (!result) return console.log("cyclic");
  if (!isOrdered(result.reverse())) return console.log("failed to sort");
  console.log(`sorted ${result.length} nodes`)
}
