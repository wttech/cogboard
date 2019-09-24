export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = (propName) => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};

export const sortByKey = (obj, key, asc = true) => Object.entries(obj)
  .sort(([, { [key]: keyA }], [, { [key]: keyB }]) => (
    asc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)))
  .reduce((newObj, [key, value]) => {
    newObj[key] = value;

    return newObj;
  }, {});

export const handleNumberInput = (minValue, maxValue) => (event) => {
    const inputValue = event.target.value;
    let parsedValue = parseInt(inputValue);
    parsedValue = isNaN(parsedValue) ? minValue : parsedValue;
    parsedValue = parsedValue > maxValue ? maxValue : parsedValue;
    parsedValue = parsedValue < minValue ? minValue : parsedValue;
    event.target.value = parsedValue.toString();
  }