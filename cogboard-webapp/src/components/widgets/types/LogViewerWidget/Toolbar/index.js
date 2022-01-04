import React from 'react';
import moment from 'moment-timezone';
import { saveDateSpan } from './DateRangePicker/helpers';

import ToggleIconButton from './ToggleIconButton';
import { Wrapper } from './styled';
import SearchInput from './SearchInput';
import ToolbarGroup from './ToolbarGroup';
import DateRangePicker from './DateRangePicker';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterPicker from './FilterPicker';

const Toolbar = ({
  wid,
  quarantine,
  widgetLocalStorage,
  setSearchFilter,
  shouldFollowLogs,
  handleFollowChange,
  lastLog
}) => {
  const handleClearLogs = () => {
    const date = lastLog?.date;
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
        <ToggleIconButton
          tooltip={shouldFollowLogs ? 'Following logs' : 'Follow logs'}
          onClick={() => handleFollowChange(!shouldFollowLogs)}
          enabled={shouldFollowLogs}
          Icon={ArrowDownwardIcon}
        />
        <ToggleIconButton
          tooltip="Clear logs"
          data-cy="clear-logs-button"
          onClick={handleClearLogs}
          Icon={DeleteIcon}
        />
      </ToolbarGroup>
    </Wrapper>
  );
};

export default Toolbar;
