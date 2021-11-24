export const saveFilters = (
  { get: localStorage, set: setLocalStorage },
  filters
) => {
  const newWidgetData = { ...localStorage(), regExpFilters: filters };
  setLocalStorage(newWidgetData);
};

export const getFilters = widgetLocalStorage =>
  widgetLocalStorage.get()?.regExpFilters || [];
