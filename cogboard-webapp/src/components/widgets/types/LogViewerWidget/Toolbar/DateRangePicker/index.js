import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ToolbarGroup from '../ToolbarGroup';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

export default function DateRangePicker() {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ToolbarGroup title="Date span">
        <DateTimePicker />
        <DateTimePicker />
      </ToolbarGroup>
    </MuiPickersUtilsProvider>
  );
}
