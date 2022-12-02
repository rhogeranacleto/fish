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