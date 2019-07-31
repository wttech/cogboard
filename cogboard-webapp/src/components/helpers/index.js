export const mapFormValuesToWidgetData = values => {
  const { columns, goNewLine, ...other } = values;
  return {
    ...other,
    config: {
      columns,
      goNewLine
    }
  };
};

export const makeIdCreator = (prefix) => (allIds) => {
  const intRegex = new RegExp(/[0-9]\d*$/, 'g');
  const [lastId] = [...allIds].sort((a, b) => Number(b.match(intRegex)) - Number(a.match(intRegex)));

  if (lastId) {
    const intId = Number(lastId.match(intRegex));

    return lastId.replace(intRegex, intId + 1);
  } else {
    return `${prefix}1`;
  }
};

export const setSize = factor => ({ theme }) => `${theme.spacing(factor)}px`;