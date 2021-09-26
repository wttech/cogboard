import React from 'react';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper
} from './styled';

export default function LogList() {
  return (
    <Container>
      <Header>
        <GridSchema>
          <ColumnTitle>Level</ColumnTitle>
          <ColumnTitle>Date</ColumnTitle>
          <ColumnTitle>Provider</ColumnTitle>
          <ColumnTitle>Message</ColumnTitle>
        </GridSchema>
      </Header>

      <LogsWrapper>
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
        <LogEntry />
      </LogsWrapper>
    </Container>
  );
}
