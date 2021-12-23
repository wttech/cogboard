import React, { useEffect, useState, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import { useLocalStorage } from '../../../../hooks';

import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';
import { getInitialLogs } from '../../../../utils/fetch';
import { joinLogs } from './helpers';

const LogViewerWidget = ({ id }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  useEffect(() => console.log(widgetData), [widgetData]);

  const [widgetLocalStorageData, setWidgetLocalStorage] = useLocalStorage(id);
  const widgetLocalStorage = {
    get: () => widgetLocalStorageData,
    set: setWidgetLocalStorage
  };

  const [searchFilter, setSearchFilter] = useState('');
  const [shouldFollowLogs, setFollow] = useState(true);

  const storedLogs = useRef([]);

  useEffect(() => {
    getInitialLogs(id).then(logs => {
      storedLogs.current = logs;
    });
  }, [id]);

  const newLogs = widgetData.content?.logs || [];
  const template = widgetData.content?.variableFields;
  const quarantine = widgetData.content?.quarantineRules || [];
  const logLines = widgetData.logLinesField || 1000;

  storedLogs.current = joinLogs(storedLogs.current, newLogs, logLines);

  return (
    <Container>
      <Toolbar
        wid={id}
        quarantine={quarantine}
        widgetLocalStorage={widgetLocalStorage}
        setSearchFilter={setSearchFilter}
        shouldFollowLogs={shouldFollowLogs}
        handleFollowChange={setFollow}
        firstLog={logs && logs[0]}
      />
      {storedLogs.current && (
        <LogList
          widgetLocalStorage={widgetLocalStorage}
          logs={storedLogs.current}
          template={template}
          search={searchFilter}
          shouldFollowLogs={shouldFollowLogs}
          handleFollowChange={setFollow}
        />
      )}
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
