import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import { useLocalStorage } from '../../../../hooks';
import { joinLogs, saveLogsToFile } from './helpers';
import LogsViewerContext from './context';
import { getInitialLogs } from '../../../../utils/fetch';
import { getFilters, getLevel } from './Toolbar/FilterPicker/helpers';
import { getDateSpan } from './Toolbar/DateRangePicker/helpers';
import {
  filterByRegExp,
  filterByDateSpan,
  filterByLevel
} from './LogList/helpers';

import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';

const LogViewerWidget = ({ id }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );

  const [widgetLocalStorageData, setWidgetLocalStorage] = useLocalStorage(id);
  const widgetLocalStorage = {
    get: () => widgetLocalStorageData,
    set: setWidgetLocalStorage
  };

  const [searchFilter, setSearchFilter] = useState('');
  const [shouldFollowLogs, setFollow] = useState(true);

  useEffect(() => {
    getInitialLogs(id).then(logs => setStoredLogs(logs));
  }, [id]);

  const newLogs = widgetData.content?.logs || [];
  const logLinesField = widgetData.logLinesField;
  const template = widgetData.content?.variableFields;
  const quarantine = widgetData.content?.quarantineRules || [];

  const [storedLogs, setStoredLogs] = useState([]);

  useEffect(() => {
    setStoredLogs(joinLogs(storedLogs, newLogs, logLinesField));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetData.content?.logs]);

  const [filterSimilarLogs, setFilterSimilarLogs] = useState(null);
  const [quarantineSimilarLogs, setQuarantineSimilarLogs] = useState(null);

  const filters = getFilters(widgetLocalStorage);
  const level = getLevel(widgetLocalStorage);
  const dateSpan = getDateSpan(widgetLocalStorage);

  const filteredLogs = storedLogs
    ?.filter(log => filterByLevel(log, level))
    .filter(log => filterByDateSpan(log, dateSpan))
    .filter(log => filterByRegExp(log, filters));

  return (
    <Container>
      <LogsViewerContext.Provider
        value={{
          wid: id,
          filter: filterSimilarLogs,
          setFilter: setFilterSimilarLogs,
          quarantine: quarantineSimilarLogs,
          setQuarantine: setQuarantineSimilarLogs
        }}
      >
        <Toolbar
          quarantine={quarantine}
          widgetLocalStorage={widgetLocalStorage}
          setSearchFilter={setSearchFilter}
          shouldFollowLogs={shouldFollowLogs}
          handleFollowChange={setFollow}
          lastLog={storedLogs?.length > 0 && storedLogs[storedLogs.length - 1]}
          onSaveLogs={() => saveLogsToFile(filteredLogs)}
        />
        <LogList
          logs={filteredLogs}
          logListFull={storedLogs.length === logLinesField}
          template={template}
          search={searchFilter}
          shouldFollowLogs={shouldFollowLogs}
          handleFollowChange={setFollow}
        />
      </LogsViewerContext.Provider>
    </Container>
  );
};

LogViewerWidget.propTypes = {
  endpoint: string,
  schedulePeriod: number,
  path: string,
  logLinesField: number,
  logFileSizeField: number,
  logRecordExpirationField: number
};

LogViewerWidget.defaultProps = {
  endpoint: '',
  schedulePeriod: 60,
  path: '',
  logLinesField: 1000,
  logFileSizeField: 50,
  logRecordExpirationField: 5
};

export default LogViewerWidget;
