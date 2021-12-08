import logLevels from '../logLevels';

export const getGridTemplate = columnNames => {
  const widths = columnNames.map(name =>
    name.toLowerCase() === 'message' ? '3fr ' : '1fr '
  );
  return widths.reduce((acc, current) => acc + current, '');
};

export const filterByLevel = (log, level) => {
  const lowestLevel = logLevels.find(
    elem => elem.value.toLowerCase() === level.toLowerCase()
  );
  const logLevel = logLevels.find(
    elem => elem.value.toLowerCase() === log.type.toLowerCase()
  );
  return logLevel.level >= lowestLevel.level;
};
