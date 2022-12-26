export const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min
}

export const gaussianRandom = (min, max, skew) => {
  let u = 0, v = 0;
  while (u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random()
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)

  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0)
    num = gaussianRandom(min, max, skew) // resample between 0 and 1 if out of range

  else {
    num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
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