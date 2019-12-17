import { sortByKey } from '../../../utils/components';

export const parseTypes = widgetTypes => {
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

export const transformMinValue = minValue => {
  const minimum = minValue > 1 || !minValue ? 1 : minValue;
  let prevValue;

  return value => {
    if (value < minimum) {
      return (prevValue = minimum);
    }

    return (prevValue =
      value < prevValue ? Math.floor(value) : Math.ceil(value));
  };
};
