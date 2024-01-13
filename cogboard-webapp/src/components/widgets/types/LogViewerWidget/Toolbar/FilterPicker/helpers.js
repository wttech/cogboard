export const saveFilters = (
  { get: localStorage, set: setLocalStorage },
  filters
) => {
  const newWidgetData = { ...localStorage(), regExpFilters: filters };
  setLocalStorage(newWidgetData);
};

export const getFilters = widgetLocalStorage =>
  widgetLocalStorage.get()?.regExpFilters || [];

export const saveLevel = (
  { get: localStorage, set: setLocalStorage },
  level
) => {
  const newWidgetData = { ...localStorage(), logsLevel: level };
  setLocalStorage(newWidgetData);
};

export const getLevel = widgetLocalStorage =>
  widgetLocalStorage.get()?.logsLevel || 'info';
