import React, { useRef, useEffect, useState } from 'react';
import { getGridTemplate, isLogHighlighted } from './helpers';
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
  logs,
  template,
  toggleExpandLog,
  search,
  shouldFollowLogs,
  handleFollowChange
}) {
  const theme = useTheme();
  const scrollerRef = useRef(null);
  const [scroll, setScroll] = useState(0);

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
  }, [logs, shouldFollowLogs, scroll]);

  const stopFollowingOnUpScroll = () => {
    if (scroll > scrollerRef.current.scrollTop) {
      handleFollowChange(false);
    }
    setScroll(scrollerRef.current.scrollTop);
  };

  const handleScrollChange = isScrolling =>
    isScrolling && stopFollowingOnUpScroll();

  const getLogByIndex = index => {
    const log = logs[index];
    return (
      <LogEntry
        id={log._id}
        expanded={log.expanded}
        toggleExpanded={() => toggleExpandLog(log._id)}
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
          totalCount={logs.length}
          increaseViewportBy={300} // defines loading overlap (in pixels)
          itemContent={getLogByIndex}
        />
      </LogsWrapper>
    </Container>
  );
}
