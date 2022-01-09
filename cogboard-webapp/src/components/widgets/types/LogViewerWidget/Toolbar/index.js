import React from 'react';

import ToggleIconButton from './ToggleIconButton';
import { Wrapper } from './styled';
import SearchInput from './SearchInput';
import ToolbarGroup from './ToolbarGroup';
import DateRangePicker from './DateRangePicker';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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

      <DateRangePicker
        widgetLocalStorage={widgetLocalStorage}
        lastLog={lastLog}
      />

      <ToolbarGroup>
        <ToggleIconButton
          tooltip={shouldFollowLogs ? 'Following logs' : 'Follow logs'}
          onClick={() => handleFollowChange(!shouldFollowLogs)}
          enabled={shouldFollowLogs}
          Icon={ArrowDownwardIcon}
        />
      </ToolbarGroup>
    </Wrapper>
  );
};

export default Toolbar;
