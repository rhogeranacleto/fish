export const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

export const shuffle = (list) =>
  list.map(item => [Math.random(), item])
    .sort(([a], [b]) => a - b)
    .map(([, item]) => item);

export const chunk = (population, chunkSize = 2) => population.reduce((list, item, i) => {
  const ch = Math.floor(i / chunkSize);
  list[ch] = [].concat((list[ch] || []), item);
  return list;
}, []);

export const removeRest = (list) => {
  list.splice(list.length - (list.length % 2), list.length % 2);
  return list;
};

export const flow = (flowMethods) => (data) => flowMethods.reduce((aggregated, flowMethod) => flowMethod(aggregated), data);

export const matchAll = (match) => (pairs) => pairs.map(match);