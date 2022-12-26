import { Fish } from "./fish.js";
import { chunk, flow, gaussianRandom, matchAll, removeRest, shuffle } from "./helper.js";
import { getElegibleParents, getInitialPopulation, MATCH_METHOD, mutatePartialList, MUTATE_METHOD, runCicle, updateLastMatched } from "./population-helper.js";

// Bigger sizes will pass the genes to children

const matchPopulation = flow([
  getElegibleParents,
  removeRest,
  shuffle,
  updateLastMatched,
  chunk,
  matchAll(MATCH_METHOD.biggerParentAsDominant),
  mutatePartialList(MUTATE_METHOD.random(0.1), 0.7)
]);

let population = getInitialPopulation(20, () => new Fish(({
  reproducibility: gaussianRandom(3, 20, 2),
  longevity: gaussianRandom(1, 25, 1),
  size: gaussianRandom(0, 100, 1),
})));


runCicle(population, matchPopulation, 1000);

// console.log(population)