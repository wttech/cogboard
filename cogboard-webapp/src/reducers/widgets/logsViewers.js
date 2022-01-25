import { TOGGLE_LOGS_VIEWER_LOG } from '../../actions/types';

const toggleLogsViewerLog = (state, { payload }) => {
  const { wid, logid } = payload;
  const expandedLogs = state[wid]?.expandedLogs || [];

  const removeFromList = (index, list) => [
    ...list.slice(0, index),
    ...list.slice(index + 1, list.length)
  ];

  const index = expandedLogs.indexOf(logid);
  const logCollapsed = index === -1;
  const newExpandedLogs = logCollapsed
    ? [...expandedLogs, logid]
    : removeFromList(index, expandedLogs);

  return {
    ...state,
    [wid]: {
      ...state[wid],
      expandedLogs: newExpandedLogs
    }
  };
};

const logsViewers = (state = {}, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_LOGS_VIEWER_LOG:
      return toggleLogsViewerLog(state, action);
    default:
      return state;
  }
};

export default logsViewers;
