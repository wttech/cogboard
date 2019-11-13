import React, { useState } from 'react';
import { string } from 'prop-types';

import { useInterval } from '../../../../hooks';
import { getDateTime } from './helpers';

import { Typography } from '@material-ui/core';
import { DatePre, TimePre } from './styled';

const WorldClockWidget = props => {
  const {
    timeZoneId,
    dateFormat,
    timeFormat,
    displayDate,
    displayTime,
    textSize
  } = props;

  const date = getDateTime(timeZoneId, dateFormat);

  const initTime = getDateTime(timeZoneId, timeFormat);
  const [time, setTime] = useState(initTime);

  useInterval(() => {
    setTime(getDateTime(timeZoneId, timeFormat));
  }, 1000);

  return (
    <Typography variant={textSize}>
      {displayTime && <TimePre>{time}</TimePre>}
      {displayDate && <DatePre>{date}</DatePre>}
    </Typography>
  );
};

WorldClockWidget.propTypes = {
  timeZoneId: string.isRequired,
  dateFormat: string.isRequired,
  timeFormat: string.isRequired,
  textSize: string
};

WorldClockWidget.defaultProps = {
  textSize: 'h5'
};

export default WorldClockWidget;
