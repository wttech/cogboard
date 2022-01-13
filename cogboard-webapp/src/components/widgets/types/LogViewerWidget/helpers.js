export const joinLogs = (currentLogs, newLogs, logLines) => {
  const joined = currentLogs;
  newLogs.forEach(newLog => {
    if (!joined.some(log => log._id === newLog._id)) {
      joined.push(newLog);
    }
  });
  return joined.slice(-logLines);
};
