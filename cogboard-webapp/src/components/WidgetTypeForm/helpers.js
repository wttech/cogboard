import { splitPropsGroupName } from '../helpers';

export const getValueRef = (values, initialValue, name) => {
  const [groupName, propName] = splitPropsGroupName(name);

  if (groupName) {
    if (values[groupName] && values[groupName][propName] !== undefined) {
      return values[groupName][propName];
    }

    return initialValue;
  }

  if (values[propName] === undefined) {
    return initialValue;
  }

  return values[propName];
};