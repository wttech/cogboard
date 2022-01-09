import React from 'react';

import ToggleIconButton from './ToggleIconButton';
import { Wrapper } from './styled';
import SearchInput from './SearchInput';
import DateRangePicker from './DateRangePicker';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterPicker from './FilterPicker';
import { saveFile } from './helpers';

const Toolbar = ({
  wid,
  quarantine,
  widgetLocalStorage,
  setSearchFilter,
  shouldFollowLogs,
  handleFollowChange,
  lastLog,
  logs
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
        wid={wid}
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
        Icon={GetAppIcon}
        onClick={() => saveFile(new Blob([JSON.stringify(logs)]))}
      />
    </Wrapper>
  );
};

export default Toolbar;
