export const joinLogs = (currentLogs, newLogs, logLines) => {
  let joined = currentLogs;
  addAccordionControler(newLogs).forEach(newLog => {
    if (!joined.some(log => log._id === newLog._id)) {
      joined.push(newLog);
    }
  });
  return joined.slice(-logLines);
};

export const addAccordionControler = logs =>
  logs?.map(log => ({ ...log, expanded: false }));

export const toggleAccordion = (logs, id) =>
  logs.map(log => (log._id === id ? { ...log, expanded: !log.expanded } : log));
