import { chunk, flow, matchAll, removeRest, shuffle } from "./helper.js";
import { getElegibleParents, getInitialPopulation, MATCH_METHOD, mutatePartialList, MUTATE_METHOD, runCicle, updateLastMatched } from "./population-helper.js";

// Inherit parent genes by a random parent

const matchPopulation = flow([
  getElegibleParents,
  removeRest,
  shuffle,
  updateLastMatched,
  chunk,
  matchAll(MATCH_METHOD.randomInherit),
  mutatePartialList(MUTATE_METHOD.random(0.1), 0.7)
]);

let population = getInitialPopulation();

runCicle(population, matchPopulation);