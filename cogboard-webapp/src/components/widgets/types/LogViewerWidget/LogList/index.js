import React from 'react';
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

const testLogTemplate = ['Provider', 'Message'];

export default function LogList({ logs }) {
  const theme = useTheme();
  const VariableLogListHeader = () => (
    <VariableGridSchema template={getGridTemplate(testLogTemplate)}>
      {testLogTemplate.map((name, index) => (
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

      <LogsWrapper>
        {logs?.map(log => (
          <LogEntry
            type={log.type}
            date={log.date}
            additionalData={log.additionalData}
            variableData={log.variableData}
          />
        ))}
      </LogsWrapper>
    </Container>
  );
}
