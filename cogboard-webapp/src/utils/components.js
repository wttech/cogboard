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

const INITIAL_STATUSES = {
  TextWidget: 'NONE',
  IframeEmbedWidget: 'NONE',
  WorldClockWidget: 'NONE',
  WhiteSpaceWidget: 'TRANSPARENT',
  CheckboxWidget: 'CHECKBOX_UNKNOWN'
};

export const getWidgetStatus = (content, widgetType) =>
  (content && content.widgetStatus) ||
  INITIAL_STATUSES[widgetType] ||
  'UNKNOWN';

export const getWidgetUpdateTime = (content, widgetType) => {
  return (
    widgetType &&
    widgetType.showUpdateTime &&
    ((content && content.lastUpdated) || 'UNKNOWN')
  );
};
