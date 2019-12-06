export const getSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;

export const getColor = variant => ({ theme }) => theme.palette[variant].main;

export const getBackgroundColor = variant => ({ theme }) =>
  theme.palette.background[variant];

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

export const hasError = error => error !== undefined;

export const getWidgetStatus = content =>
  (content && content.widgetStatus) || 'UNDEFINED';
