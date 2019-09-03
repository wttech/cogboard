import { splitPropsGroupName } from '../helpers';

export const createValueRef = (values, initialValue, name) => {
  const [groupName, propName] = splitPropsGroupName(name);

  if (groupName) {
    if (!values[groupName]) {
      values[groupName] = {};
      values[groupName][propName] = initialValue;
    }

    return values[groupName][propName];
  }

  if (values[propName] === undefined) {
    values[propName] = initialValue;
  }

  return values[propName];
};