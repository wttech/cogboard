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

const Toolbar = ({
  wid,
  quarantine,
  widgetLocalStorage,
  setSearchFilter,
  shouldFollowLogs,
  handleFollowChange,
  firstLog
}) => {
  const theme = useTheme();

  const handleClearLogs = () => {
    const date = firstLog?.date;
    if (date) {
      const beginDate = moment(date).add(1, 'seconds');
      saveDateSpan(widgetLocalStorage, { begin: beginDate, end: null });
    }
  };

  return (
    <Wrapper>
      <ToolbarGroup>
        <SearchInput
          setSearchFilter={setSearchFilter}
          debounce={500}
          minLetters={3}
        />
      </ToolbarGroup>

      <FilterPicker
        widgetLocalStorage={widgetLocalStorage}
        wid={wid}
        quarantine={quarantine}
      />

      <DateRangePicker widgetLocalStorage={widgetLocalStorage} />

      <ToolbarGroup>
        <Button
          variant="contained"
          size="small"
          onClick={() => handleFollowChange(!shouldFollowLogs)}
        >
          <GetAppIcon />
          {shouldFollowLogs ? 'Stop following' : 'Follow logs'}
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
    </Wrapper>
  );
};

export default Toolbar;
