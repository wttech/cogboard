export const getGridTemplate = columnNames => {
  const widths = columnNames.map(name =>
    name.toLowerCase() === 'message' ? '3fr ' : '1fr '
  );
  return widths.reduce((acc, current) => acc + current, '');
};

export const filterByDateSpan = (log, { begin, end }) => {
  const date = new Date(log.date);

  if (begin && date < begin) return false;
  if (end && date > end) return false;

  return true;
};
