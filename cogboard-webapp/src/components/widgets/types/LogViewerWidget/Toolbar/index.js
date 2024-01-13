import React from 'react';

import ToggleIconButton from './ToggleIconButton';
import { Wrapper } from './styled';
import SearchInput from './SearchInput';
import DateRangePicker from './DateRangePicker';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import SaveIcon from '@material-ui/icons/Save';
import FilterPicker from './FilterPicker';

const Toolbar = ({
  quarantine,
  widgetLocalStorage,
  setSearchFilter,
  shouldFollowLogs,
  handleFollowChange,
  lastLog,
  onSaveLogs
}) => {
  return (
    <Wrapper>
      <SearchInput
        setSearchFilter={setSearchFilter}
        debounce={500}
        minLetters={3}
      />
      <FilterPicker
        widgetLocalStorage={widgetLocalStorage}
        quarantine={quarantine}
      />
      <DateRangePicker
        widgetLocalStorage={widgetLocalStorage}
        lastLog={lastLog}
      />
      <ToggleIconButton
        tooltip={shouldFollowLogs ? 'Following logs' : 'Follow logs'}
        onClick={() => handleFollowChange(!shouldFollowLogs)}
        enabled={shouldFollowLogs}
        Icon={ArrowDownwardIcon}
      />
      <ToggleIconButton
        tooltip={'Export to file'}
        Icon={SaveIcon}
        onClick={onSaveLogs}
      />
    </Wrapper>
  );
};

export default Toolbar;
