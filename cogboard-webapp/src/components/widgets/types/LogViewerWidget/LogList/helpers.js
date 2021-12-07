export const getGridTemplate = columnNames => {
  const widths = columnNames.map(name =>
    name.toLowerCase() === 'message' ? '3fr ' : '1fr '
  );
  return widths.reduce((acc, current) => acc + current, '');
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
  search && getLogTexts(log).some(text => text.match(search));

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
