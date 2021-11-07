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

export default function LogList({ logs, template }) {
  const theme = useTheme();
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

      <LogsWrapper>
        {logs?.map((log, index) => (
          <LogEntry
            key={index}
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
