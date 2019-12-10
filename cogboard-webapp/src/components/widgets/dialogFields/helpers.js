import { sortByKey } from '../../../utils/components';

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

export const transformMinValue = minValue => {
  let prevValue;

  return value => {
    if (value < minValue) {
      return (prevValue = minValue);
    }

    // if (prevValue === minValue) {
    //   return (prevValue = 1);
    // }

    return (prevValue =
      value < prevValue ? Math.floor(value) : Math.ceil(value));
  };
};
