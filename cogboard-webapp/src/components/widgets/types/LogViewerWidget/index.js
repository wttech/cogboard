import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import { useLocalStorage } from '../../../../hooks';

import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';

const LogViewerWidget = ({ id }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );

  const [followLogs, setFollow] = useState(true);

  useEffect(() => console.log(widgetData), [widgetData]);

  const [widgetLocalStorageData, setWidgetLocalStorage] = useLocalStorage(id);
  const widgetLocalStorage = {
    get: () => widgetLocalStorageData,
    set: setWidgetLocalStorage
  };

  const logs = widgetData.content?.logs;
  const template = widgetData.content?.variableFields;
  const quarantine = widgetData.content?.quarantine || [];
  return (
    <Container>
      <Toolbar
        wid={id}
        quarantine={quarantine}
        widgetLocalStorage={widgetLocalStorage}
        logs={logs}
        followLogs={followLogs}
        handleFollowChange={setFollow}
      />
      {logs && (
        <LogList
          widgetLocalStorage={widgetLocalStorage}
          logs={logs}
          template={template}
          followLogs={followLogs}
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
