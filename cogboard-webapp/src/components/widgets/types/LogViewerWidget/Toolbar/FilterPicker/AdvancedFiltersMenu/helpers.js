export const setFilters = (
  { get: localStorage, set: setLocalStorage },
  filters
) => {
  const newWidgetData = { ...localStorage(), regExpFilters: filters };
  setLocalStorage(newWidgetData);
};
