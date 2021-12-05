import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@material-ui/core';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper,
  VariableGridSchema
} from './styled';
import getGridTemplate from './helpers';
import { getFilters } from '../Toolbar/FilterPicker/helpers';

export default function LogList({
  widgetLocalStorage,
  logs,
  template,
  followLogs,
  handleFollowChange
}) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);
  const logWrapperRef = useRef();
  const [scroll, setScroll] = useState(0);
  const filterByRegExp = (log, filters) =>
    filters
      .filter(f => f.checked)
      .every(({ regExp }) => {
        const regExpObj = new RegExp(regExp);
        const texts = [];
        // loop through log variable columns
        log.variableData.forEach(({ header, description }) => {
          texts.push(header);
          texts.push(description);
        });

        return texts.some(text => text.match(regExpObj));
      });

  const filteredLogs = logs?.filter(log => filterByRegExp(log, filters));

  useEffect(() => {
    if (followLogs) {
      logWrapperRef.current.scrollTo({
        top: logWrapperRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    setScroll(logWrapperRef.current.scrollTop);
    console.log(scroll);
  }, [filteredLogs, followLogs, scroll]);

  const unfollowOnUpScroll = () => {
    if (scroll > logWrapperRef.current.scrollTop) {
      handleFollowChange(false);
    }
    setScroll(logWrapperRef.current.scrollTop);
  };

  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(template)}>
      {template.map((name, index) => (
        <ColumnTitle key={index}>{name}</ColumnTitle>
      ))}
    </VariableGridSchema>
  );

  return (
    <Container>
      <Header theme={theme}>
        <GridSchema>
          <ColumnTitle>Level</ColumnTitle>
          <ColumnTitle>Date</ColumnTitle>
          <VariableLogListHeader />
        </GridSchema>
      </Header>

      <LogsWrapper ref={logWrapperRef} onScroll={unfollowOnUpScroll}>
        {filteredLogs?.map((log, index) => (
          <LogEntry
            key={index}
            id={log._id}
            type={log.type}
            date={log.date}
            variableData={log.variableData}
            template={template}
          />
        ))}
      </LogsWrapper>
    </Container>
  );
}
