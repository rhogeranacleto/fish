import { Fish } from "./fish.js";
import { randomNumber } from "./helper.js";
import kit from 'terminal-kit'

export const getRandomFish = () => new Fish({
  reproducibility: randomNumber(3, 20),
  longevity: randomNumber(1, 25),
  size: randomNumber(0, 100),
});

export const getInitialPopulation = (count = 20, method = getRandomFish) => new Array(count).fill(0).map(method);

export const getElegibleParents = (population) => population.filter(item => (Date.now() - item.lastMatchedAt) / 1000 > item.reproducibility
);

export const killOld = (items) => items.filter(item => (Date.now() - item.createdAt) / 1000 < item.longevity);

export const updateLastMatched = (parents) => {
  parents.forEach(parent => {
    parent.lastMatchedAt = Date.now();
  });

  return parents;
}

export const getRandomPartialList = (population, chance) => population.filter(() => Math.random() > chance);

export const mutatePartialList = (mutateItem, chance) => (population) => {
  const selectedItems = getRandomPartialList(population, chance);

  selectedItems.forEach(mutateItem);

  return population;
}

export const MATCH_METHOD = {
  reproducibilityFromFirstAndLongevityFromSecond: (parents) => new Fish({
    reproducibility: parents[0].reproducibility,
    longevity: parents[1].longevity,
    size: parents[Math.floor(Math.random() * 2)].size,
  }),
  randomInherit: (parents) => new Fish(Object.fromEntries(
    ['reproducibility', 'longevity', 'size']
      .map(prop => [prop, parents[Math.floor(Math.random() * 2)][prop]])
  )),
  biggerParentAsDominant: (parents) => {
    const biggerParent = parents[parents[0].size > parents[1].size ? 0 : 1];

    return new Fish(Object.fromEntries(
      ['reproducibility', 'longevity', 'size']
        .map(prop => [prop, biggerParent[prop]])
    ))
  }
}

export const MUTATE_METHOD = {
  random: (chance) => (item) => {
    ['reproducibility', 'longevity', 'size'].forEach(prop => {
      if (Math.random() < chance) {
        item[prop] = getRandomFish()[prop];
      }
    })
  }
}

export const runCicle = (population, matchPopulation, time = 1000) => {
  kit.terminal.fullscreen();
  let loop = 1;

  setInterval(() => {
    const initialPopulationCount = population.length;

    const elegibleParents = getElegibleParents(population);

    const newChildren = matchPopulation(population);

    const newPopulation = [...population, ...newChildren];

    population = killOld(newPopulation);

    const populationSizes = population.reduce((size, item) => size + item.size, 0);

    kit.terminal.clear();

    // kit.terminal.table(population.map(item => [item.id, item.reproducibility, item.longevity, item.size]));
    console.log(population.map(item => [item.id, item.reproducibility, item.longevity, item.size].join(' | ')).join('\n'))

    console.log(`\n\nLoop ${loop++}`);
    console.log(`Initial: ${initialPopulationCount}`);
    console.log(`Parents: ${elegibleParents.length}`);
    console.log(`Added: ${newChildren.length}`);
    console.log(`Killed: ${newPopulation.length - population.length}`);
    console.log(`Final: ${population.length}`)
    // console.log(`Initial ${initialPopulationCount} | parents ${elegibleParents.length} | new ${newChildren.length} | killed ${newPopulation.length - population.length} | ${populationSizes / population.length}`);
  }, time);
}