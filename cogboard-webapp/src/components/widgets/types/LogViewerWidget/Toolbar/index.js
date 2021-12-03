import React from 'react';
import moment from 'moment-timezone';
import { saveDateSpan } from './DateRangePicker/helpers';

import { Button, useTheme } from '@material-ui/core';
import { RedButton, Wrapper } from './styled';
import SearchInput from './SearchInput';
import ToolbarGroup from './ToolbarGroup';
import DateRangePicker from './DateRangePicker';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterPicker from './FilterPicker';
import QuarantineModal from './QuarantineModal';

const Toolbar = ({ wid, quarantine, widgetLocalStorage }) => {
  const theme = useTheme();

  const handleClearLogs = () =>
    saveDateSpan(widgetLocalStorage, { begin: moment(), end: null });

  return (
    <Wrapper>
      <ToolbarGroup>
        <SearchInput />
      </ToolbarGroup>

      <FilterPicker widgetLocalStorage={widgetLocalStorage} />

      <DateRangePicker widgetLocalStorage={widgetLocalStorage} />

      <ToolbarGroup>
        <Button variant="contained" size="small">
          <GetAppIcon />
          Follow logs
        </Button>
        <RedButton
          variant="contained"
          size="small"
          theme={theme}
          onClick={handleClearLogs}
        >
          <DeleteIcon />
          Clear logs
        </RedButton>
      </ToolbarGroup>
      <ToolbarGroup>
        <QuarantineModal wid={wid} quarantine={quarantine} />
      </ToolbarGroup>
    </Wrapper>
  );
};

export default Toolbar;
