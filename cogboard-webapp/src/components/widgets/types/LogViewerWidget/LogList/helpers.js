import logLevels from '../logLevels';

export const getGridTemplate = columnNames => {
  const widths = columnNames.map(name =>
    name.toLowerCase() === 'message' ? '3fr ' : '1fr '
  );
  return widths.reduce((acc, current) => acc + current, '');
};

export const filterByLevel = (log, level) => {
  const logLevel = logLevels[log.type.toLowerCase()]?.level;
  const selectedLevel = logLevels[level.toLowerCase()].level;
  return logLevel ? logLevel >= selectedLevel : true;
};

const getLogTexts = log => {
  const texts = [];
  // loop through log variable columns
  log.variableData.forEach(({ header, description }) => {
    texts.push(header);
    texts.push(description);
  });
  return texts;
};

export const isLogHighlighted = (log, search) =>
  search && getLogTexts(log).some(text => text.match(new RegExp(search, 'i')));

export const highlightText = (text, search, Component) =>
  search
    ? text
        .split(new RegExp(`(${search})`, 'gi'))
        .map((part, index) =>
          part.toLowerCase() === search.toLowerCase() ? (
            <Component key={index}>{part}</Component>
          ) : (
            <span key={index}>{part}</span>
          )
        )
    : text;

export const filterByRegExp = (log, filters) =>
  filters
    .filter(f => f.checked)
    .every(({ regExp }) =>
      getLogTexts(log).some(text => text.match(new RegExp(regExp)))
    );

/*
  log: string?
  begin: momentjs-object?
  end: momentjs-object?
*/
export const filterByDateSpan = (log, { begin, end }) => {
  if (!log.date) {
    return !begin && !end; // let empty date through if there is no date span
  }

  const date = new Date(log.date);

  if (begin && date < begin) return false;
  if (end && date > end) return false;

  return true;
};
