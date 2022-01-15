export const joinLogs = (currentLogs, newLogs, logLines) => {
  let joined = currentLogs.slice();
  newLogs.forEach(newLog => {
    if (!joined.some(log => log._id === newLog._id)) {
      joined.push(newLog);
    }
  });
  return joined.slice(-logLines);
};

const saveFile = blob => {
  const a = document.createElement('a');
  const today = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  a.download = today.toLocaleDateString('en-US', options) + '.txt';
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', e => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};

export const saveLogsToFile = logs =>
  saveFile(new Blob([JSON.stringify(logs)]));
