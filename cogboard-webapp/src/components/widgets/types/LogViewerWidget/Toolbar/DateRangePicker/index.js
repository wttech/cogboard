import React from 'react';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import ToolbarGroup from '../ToolbarGroup';

export default function DateRangePicker() {
  return (
    <ToolbarGroup title="Date span">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker
          label="Begin"
          format="hh:mm DD/MM/YY"
          onChange={() => console.log('TODO')}
        />
        <DateTimePicker
          label="End"
          format="hh:mm DD/MM/YY"
          onChange={() => console.log('TODO')}
        />
      </MuiPickersUtilsProvider>
    </ToolbarGroup>
  );
}
