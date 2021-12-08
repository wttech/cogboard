import moment from 'moment-timezone';

export const saveDateSpan = (
  { get: localStorage, set: setLocalStorage },
  dateSpan
) => {
  const newWidgetData = { ...localStorage(), dateSpan: dateSpan };
  setLocalStorage(newWidgetData);
};

export const getDateSpan = widgetLocalStorage => {
  const dateSpan = widgetLocalStorage.get()?.dateSpan;
  if (!dateSpan) return { begin: null, end: null };

  const begin = dateSpan.begin;
  const end = dateSpan.end;
  return {
    begin: begin ? moment(begin) : null,
    end: end ? moment(end) : null
  };
};
