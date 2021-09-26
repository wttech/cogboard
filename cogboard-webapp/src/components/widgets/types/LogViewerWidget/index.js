import React from 'react';
import { number, string } from 'prop-types';
import Toolbar from './Toolbar';
import LogList from './LogList';
import { Container } from './styled';

const LogViewerWidget = ({
  id,
  endpoint,
  schedulePeriod,
  path,
  logLinesField,
  logFileSizeField,
  logRecordExpirationField
}) => {
  return (
    <Container>
      <Toolbar />
      <LogList />
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
