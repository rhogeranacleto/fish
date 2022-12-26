import { chunk, flow, matchAll, removeRest, shuffle } from "./helper.js";
import { getElegibleParents, getInitialPopulation, MATCH_METHOD, mutatePartialList, MUTATE_METHOD, runCicle, updateLastMatched } from "./population-helper.js";

// Reproducibility by the first parent and longevity by the second one

const matchPopulation = flow([
  getElegibleParents,
  removeRest,
  shuffle,
  updateLastMatched,
  chunk,
  matchAll(MATCH_METHOD.reproducibilityFromFirstAndLongevityFromSecond),
  mutatePartialList(MUTATE_METHOD.random(0.1), 0.7)
]);

let population = getInitialPopulation();

runCicle(population, matchPopulation);


// kit.terminal.table([
//   ['header #1', 'header #2', 'header #3'],
//   ['row #1', 'a much bigger cell, a much bigger cell, a much bigger cell... ', 'cell'],
//   ['row #2', 'cell', 'a medium cell'],
//   ['row #3', 'cell', 'cell'],
//   ['row #4', 'cell\nwith\nnew\nlines', '^YThis ^Mis ^Ca ^Rcell ^Gwith ^Bmarkup^R^+!']
// ]);

// setTimeout(() => {
//   kit.terminal.clear()

//   kit.terminal.table([
//     ['header #1', 'header #2', 'header #3'],
//     ['row #2', 'cell', 'a medium cell'],

//   ]);
// }, 2000);