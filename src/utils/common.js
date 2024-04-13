export const getUniqueValues = (array, property) => {
  const propValues = array.map((item) => item[property]);
  return [...new Set(propValues)];
};
