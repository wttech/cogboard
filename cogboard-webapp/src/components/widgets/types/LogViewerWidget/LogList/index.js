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

const logHeight = 28;

export default function LogList({
  logs,
  template,
  search,
  shouldFollowLogs,
  handleFollowChange,
  logListFull
}) {
  const theme = useTheme();
  const virtuosoRef = useRef(null);
  const scrollerRef = useRef(null);
  const prevScrollPos = useRef(0);
  const prevLastLogId = useRef(null);
  const prevLogsLength = useRef(null);

  const logsCountOffset = logs.length - prevLogsLength.current;

  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(template)}>
      {template?.map((name, index) => (
        <ColumnTitle key={index}>{name}</ColumnTitle>
      ))}
    </VariableGridSchema>
  );

  const handleScroll = () => {
    const scrollerOffset =
      scrollerRef.current.scrollTop - prevScrollPos.current;

    const isScrollingUpward =
      scrollerOffset < 0 && scrollerOffset < logHeight * logsCountOffset;
    if (isScrollingUpward) {
      handleFollowChange(false);
    }
    prevScrollPos.current = scrollerRef.current.scrollTop;
    prevLogsLength.current = logs.length;
  };

  useEffect(() => {
    if (shouldFollowLogs) {
      virtuosoRef.current.scrollToIndex({
        index: logs.length - 1,
        align: 'bottom',
        behavior: 'smooth'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldFollowLogs]);

  useEffect(() => {
    if (!shouldFollowLogs && logListFull) {
      if (prevLastLogId.current !== null) {
        let offset = 0;
        for (let i = logs.length - 1; i >= 0; i--) {
          if (logs[i]._id === prevLastLogId.current) {
            break;
          }
          offset += 1;
        }

        const COULD_NOT_FIND_LOG = offset === logs.length;
        if (!COULD_NOT_FIND_LOG) {
          offset -= logsCountOffset;

          virtuosoRef.current.scrollTo({
            top: prevScrollPos.current - offset * logHeight,
            behavior: 'instant'
          });
        }
      }
    }
    prevLastLogId.current = logs.length > 0 && logs[logs.length - 1]._id;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logs]);

  const getLogByIndex = index => (
    <MemoLogEntry key={logs[index]._id} log={logs[index]} />
  );

  const MemoLogEntry = React.memo(({ log }) => (
    <LogEntry
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
