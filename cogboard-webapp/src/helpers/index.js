export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const splitPropsGroupName = propName => {
  return propName.includes('.') ? propName.split('.') : [undefined, propName];
};

export const sortByKey = (obj, key, asc = true) =>
  Object.entries(obj)
    .sort(([, { [key]: keyA }], [, { [key]: keyB }]) =>
      asc ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA)
    )
    .reduce((newObj, [key, value]) => {
      newObj[key] = value;

      return newObj;
    }, {});

export const capitalize = ([firstLetter, ...rest]) =>
  [firstLetter.toUpperCase(), ...rest].join('');

export const parseYupErrors = errors => {
  let result = {};
  errors.inner.forEach(error => {
    const { path, message } = error;
    if (path in result) {
      result[path].push(message);
    } else {
      result[path] = [message];
    }
  });

  return result;
};

export const trimLeadingZeros = inputValue => String(parseInt(inputValue));

export const hasError = error => error !== undefined;
