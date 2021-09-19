import React from 'react';
import { number, string } from 'prop-types';

import Toolbar from './Toolbar';

const LogViewerWidget = ({
  id,
  endpoint,
  schedulePeriod,
  path,
  logLinesField,
  logFileSizeField,
  logRecordExpirationField
}) => {
  return <Toolbar />;
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
