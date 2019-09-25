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


  export const parseYupErrors = (errors) => {
    let result = {};
    errors.inner.forEach(error => {
      if (error.path in result) {
        result[error.path].push(error.message)
      } else {
        result[error.path] = [error.message]
      }
    });
    return result;
  }