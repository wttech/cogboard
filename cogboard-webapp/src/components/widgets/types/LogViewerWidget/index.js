import React, { useEffect } from 'react';
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
  useEffect(() => console.log(widgetData), [widgetData]);

  const [widgetLocalStorage, setWidgetLocalStorage] = useLocalStorage(id);

  const logs = widgetData.content?.logs;
  return (
    <Container>
      <Toolbar
        widgetLocalStorage={{
          get: () => widgetLocalStorage,
          set: setWidgetLocalStorage
        }}
      />
      {logs && (
        <LogList
          widgetLocalStorage={widgetLocalStorage}
          logs={logs}
          template={logs[0].variableData.template}
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
