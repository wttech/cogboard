import React, { useRef, useEffect, useState } from 'react';
import {
  getGridTemplate,
  filterByRegExp,
  filterByDateSpan,
  isLogHighlighted,
  filterByLevel
} from './helpers';
import { getFilters, getLevel } from '../Toolbar/FilterPicker/helpers';
import { getDateSpan } from '../Toolbar/DateRangePicker/helpers';
import { useTheme } from '@material-ui/core';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper,
  StyledVirtuoso,
  VariableGridSchema
} from './styled';

export default function LogList({
  widgetLocalStorage,
  logs,
  template,
  search,
  shouldFollowLogs,
  handleFollowChange
}) {
  const theme = useTheme();
  const scrollerRef = useRef(null);
  const [scroll, setScroll] = useState(0);

  const filters = getFilters(widgetLocalStorage);
  const level = getLevel(widgetLocalStorage);
  const dateSpan = getDateSpan(widgetLocalStorage);

  const filteredLogs = logs
    ?.filter(log => filterByLevel(log, level))
    .filter(log => filterByDateSpan(log, dateSpan))
    .filter(log => filterByRegExp(log, filters));

  console.log(template);

  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(template)}>
      {template?.map((name, index) => (
        <ColumnTitle key={index}>{name}</ColumnTitle>
      ))}
    </VariableGridSchema>
  );

  useEffect(() => {
    if (shouldFollowLogs) {
      scrollerRef.current.scrollTo({
        top: scrollerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
    setScroll(scrollerRef.current.scrollTop);
  }, [filteredLogs, shouldFollowLogs, scroll]);

  const stopFollowingOnUpScroll = () => {
    if (scroll > scrollerRef.current.scrollTop) {
      handleFollowChange(false);
    }
    setScroll(scrollerRef.current.scrollTop);
  };

  const handleScrollChange = isScrolling =>
    isScrolling && stopFollowingOnUpScroll();

  const getLogByIndex = index => {
    const log = filteredLogs[index];
    return (
      <LogEntry
        key={log._id}
        id={log._id}
        type={log.type}
        date={log.date}
        variableData={log.variableData}
        template={template}
        search={search}
        highlight={isLogHighlighted(log, search)}
      />
    );
  };

  return (
    <Container>
      <Header theme={theme}>
        <GridSchema>
          <ColumnTitle>Level</ColumnTitle>
          <ColumnTitle>Date</ColumnTitle>
          <VariableLogListHeader />
        </GridSchema>
      </Header>

      <LogsWrapper>
        <StyledVirtuoso
          scrollerRef={ref => (scrollerRef.current = ref)}
          isScrolling={handleScrollChange}
          totalCount={filteredLogs.length}
          increaseViewportBy={300} // defines loading overlap (in pixels)
          itemContent={getLogByIndex}
        />
      </LogsWrapper>
    </Container>
  );
}
