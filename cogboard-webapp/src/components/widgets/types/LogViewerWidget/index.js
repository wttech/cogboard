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
  return (
    <Container>
      <Toolbar />
      <LogList logs={widgetData.content?.logs} />
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
