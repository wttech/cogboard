export const calculatePercentageValue = (value, maxValue) =>
  Math.round((100 * value) / maxValue);

export const getNumberOfElements = (array, number) =>
  array.slice(Math.max(array.length - number, 0));

export const convertEpochToDate = value => {
  const convertedEpoch = parseInt(value) + new Date().getTimezoneOffset() * -1;
  return new Date(convertedEpoch);
};
