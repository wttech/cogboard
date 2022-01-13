import React, { useRef, useEffect } from 'react';
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
  wid,
  logs,
  template,
  search,
  shouldFollowLogs,
  handleFollowChange
}) {
  const theme = useTheme();
  const virtuosoRef = useRef(null);
  const scrollerRef = useRef(null);
  const listScrollPos = useRef(0);

  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(template)}>
      {template?.map((name, index) => (
        <ColumnTitle key={index}>{name}</ColumnTitle>
      ))}
    </VariableGridSchema>
  );

  const handleScroll = () => {
    const isScrollingUpward =
      listScrollPos.current > scrollerRef.current.scrollTop;
    if (isScrollingUpward) {
      handleFollowChange(false);
    }
    listScrollPos.current = scrollerRef.current.scrollTop;
  };

  useEffect(() => {
    if (shouldFollowLogs) {
      virtuosoRef.current.scrollToIndex(logs.length - 1);
    }
  }, [shouldFollowLogs]);

  const getLogByIndex = index => (
    <MemoLogEntry key={logs[index]._id} log={logs[index]} />
  );

  const MemoLogEntry = React.memo(({ log }) => (
    <LogEntry
      wid={wid}
      key={log._id}
      id={log._id}
      type={log.type}
      date={log.date}
      variableData={log.variableData}
      template={template}
      search={search}
      highlight={isLogHighlighted(log, search)}
      onToggle={() => handleFollowChange(false)}
    />
  ));

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
          ref={virtuosoRef}
          scrollerRef={ref => (scrollerRef.current = ref)}
          isScrolling={handleScroll}
          totalCount={logs.length}
          increaseViewportBy={300} // defines loading overlap (in pixels)
          itemContent={getLogByIndex}
          atBottomThreshold={0}
          followOutput={isAtBottom =>
            shouldFollowLogs && !isAtBottom ? 'smooth' : false
          }
        />
      </LogsWrapper>
    </Container>
  );
}
