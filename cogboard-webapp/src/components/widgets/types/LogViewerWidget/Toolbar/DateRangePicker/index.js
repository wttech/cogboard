import React from 'react';
import moment from 'moment-timezone';
import MomentUtils from '@date-io/moment';
import { getDateSpan, saveDateSpan } from './helpers';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import UpdateIcon from '@material-ui/icons/Update';
import ToolbarGroup from '../ToolbarGroup';
import ToggleIconButton from '../ToggleIconButton';
import CustomPicker from './CustomPicker';
import { DatePickerWrapper } from './styled';

const DateRangePicker = ({ widgetLocalStorage, lastLog }) => {
  const { begin, end } = getDateSpan(widgetLocalStorage);

  const handleBeginChange = date =>
    saveDateSpan(widgetLocalStorage, { begin: date, end });
  const handleEndChange = date =>
    saveDateSpan(widgetLocalStorage, { begin, end: date });

  const handleClearLogs = () => {
    const date = lastLog?.date;
    if (date) {
      const beginDate = moment(date).add(1, 'seconds');
      saveDateSpan(widgetLocalStorage, { begin: beginDate, end: null });
    }
  };

  return (
    <ToolbarGroup title="Date span">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePickerWrapper>
          <CustomPicker
            label="Begin"
            value={begin}
            onChange={handleBeginChange}
          />
          <ToggleIconButton
            tooltip="Show logs from now"
            data-cy="show-logs-from-now-button"
            onClick={handleClearLogs}
            Icon={UpdateIcon}
          />
        </DatePickerWrapper>
        <CustomPicker label="End" value={end} onChange={handleEndChange} />
      </MuiPickersUtilsProvider>
    </ToolbarGroup>
  );
};

export default DateRangePicker;
