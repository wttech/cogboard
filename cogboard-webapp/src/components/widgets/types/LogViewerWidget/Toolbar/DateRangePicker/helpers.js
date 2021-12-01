export const saveDateSpan = (
  { get: localStorage, set: setLocalStorage },
  dateSpan
) => {
  const newWidgetData = { ...localStorage(), dateSpan: dateSpan };
  setLocalStorage(newWidgetData);
};

export const getDateSpan = widgetLocalStorage =>
  widgetLocalStorage.get()?.dateSpan || { begin: null, end: null };
