import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { number, string } from 'prop-types';
import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';

const LogViewerWidget = ({ id }) => {
  const widgetData = useSelector(
    ({ widgets }) => widgets.widgetsById[id],
    shallowEqual
  );
  useEffect(() => console.log(widgetData), [widgetData]);
  const logs = widgetData.content?.logs;
  const template = widgetData.content?.variableFields;
  const quarantine = widgetData.content?.quarantine || [];
  return (
    <Container>
      <Toolbar wid={id} quarantine={quarantine} />
      {logs && <LogList logs={logs} template={template} />}
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
