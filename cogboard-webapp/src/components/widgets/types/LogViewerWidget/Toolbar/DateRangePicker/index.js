import React from 'react';
import MomentUtils from '@date-io/moment';
import { getDateSpan, saveDateSpan } from './helpers';

import ToolbarGroup from '../ToolbarGroup';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CustomPicker from './CustomPicker';

const format = 'hh:mm  DD/MM/YY';

const DateRangePicker = ({ widgetLocalStorage }) => {
  const { begin, end } = getDateSpan(widgetLocalStorage);

  const handleBeginChange = date =>
    saveDateSpan(widgetLocalStorage, { begin: date, end });
  const handleEndChange = date =>
    saveDateSpan(widgetLocalStorage, { begin, end: date });

  return (
    <ToolbarGroup title="Date span">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <CustomPicker
          label="Begin"
          value={begin}
          format={format}
          disableFuture
          onChange={handleBeginChange}
        />
        <CustomPicker
          label="End"
          value={end}
          format={format}
          disableFuture
          onChange={handleEndChange}
        />
      </MuiPickersUtilsProvider>
    </ToolbarGroup>
  );
};

export default DateRangePicker;
