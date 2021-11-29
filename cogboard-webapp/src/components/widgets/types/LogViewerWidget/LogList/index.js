import React from 'react';
import { useTheme } from '@material-ui/core';
import { getGridTemplate, filterByRegExp, shouldHighlight } from './helpers';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper,
  VariableGridSchema
} from './styled';
import { getFilters } from '../Toolbar/FilterPicker/helpers';

export default function LogList({
  widgetLocalStorage,
  logs,
  template,
  search
}) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);

  const filteredLogs = logs?.filter(log => filterByRegExp(log, filters));

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
        {filteredLogs?.map((log, index) => (
          <LogEntry
            key={index}
            id={log._id}
            type={log.type}
            date={log.date}
            variableData={log.variableData}
            template={template}
            highlight={shouldHighlight(log, search)}
          />
        ))}
      </LogsWrapper>
    </Container>
  );
}
