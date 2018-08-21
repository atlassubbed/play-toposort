# play-toposort

Playground for testing toposort implementations and graph walking algorithms.

[![Travis](https://img.shields.io/travis/atlassubbed/play-toposort.svg)](https://travis-ci.org/atlassubbed/play-toposort)

---

## install

This is not a published package, but feel free to clone the repository and play with it.

## why

You probably run into tree structures all the time. If you are dealing with HTML, then you are dealing with a tree. Trees are convenient in that a DFS will visit nodes in a correct topological order (guaranteed at preorder). This ordering is important for ensuring that your tree-processing program runs in a "top-down" manner. 

Sometimes you don't have a tree, though. What if we've constructed a program which lets users glue together nodes like legos? Well, as soon as they deviate from a tree, we can no longer assume:

  1. There *is* a topological order.
  2. Preorder DFS will be in topological order, if any.

The first point above is not an issue if our new graph is still a DAG since all DAGs have a topological order associated with them. The second point remains an issue. Thanks to the math giants, topological sort can be done in linear time. DFS can be sprinkled with a few trivial boolean checks and will topologically sort a DAG *very* efficiently.

I am interested in the case where the DAG is *approximately* a forest of disjoint trees, but sparse edges may exist between *any* nodes in the forest. In other words, the DAG is not a forest of disjoint trees, but if you remove a "small" number of edges, it would become a forest of disjoint trees.


## existing work on DAGs

There are lots of libraries floating around in the wild which let you construct DAGs in a useful way, many of which are used in implementing reactive data flow. My first encounter with such a program was with [Meteor.js](https://www.meteor.com/), which implemented the magical `Tracker.autorun`. If done right, then it's just a DAG that gets traversed in topological order; there's no magic.

Some of these libraries use naive traversal methods like BFS or DFS to track changes across a DAG. BFS will not run in topological order, in general, so updating your graph with BFS is a terrible idea unless you enjoy inconsistent state and duplicated processing.

## philosophy

A topologial sort that encounters a cylic construction should either return false (to every previous turtle) -- ultimately returning false instead of a list -- or should throw an error. The only acceptable "graceful" handling of a cylic graph in a program which only allows DAGs is to tell the developer that they have made a mistake and should not ship their program. Otherwise, we have to establish some sort of convention for patching cyclic dependencies -- and that just seems gimmicky.