import { sortByKey } from '../../../helpers';

export const parseWidgetTypes = widgetTypes => {
  const sortedWidgetTypes = sortByKey(widgetTypes, 'name');

  return Object.entries(sortedWidgetTypes).reduce((obj, [type, { name }]) => {
    return [
      ...obj,
      {
        display: name,
        value: type
      }
    ];
  }, []);
};

export const transformMinValueToHalf = () => {
  let prevValue;

  return value => {
    if (value < 1) {
      return (prevValue = 0.5);
    }

    if (prevValue === 0.5) {
      return (prevValue = 1);
    }

    return (prevValue =
      value < prevValue ? Math.floor(value) : Math.ceil(value));
  };
};
