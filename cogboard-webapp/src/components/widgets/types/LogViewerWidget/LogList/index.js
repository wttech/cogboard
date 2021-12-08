import React from 'react';
import { useTheme } from '@material-ui/core';
import {
  getGridTemplate,
  filterByRegExp,
  filterByDateSpan,
  isLogHighlighted,
  filterByLevel
} from './helpers';
import { getFilters, getLevel } from '../Toolbar/FilterPicker/helpers';
import { getDateSpan } from '../Toolbar/DateRangePicker/helpers';
import LogEntry from './LogEntry';
import {
  Container,
  Header,
  GridSchema,
  ColumnTitle,
  LogsWrapper,
  VariableGridSchema
} from './styled';

export default function LogList({
  widgetLocalStorage,
  logs,
  template,
  search
}) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);
  const level = getLevel(widgetLocalStorage);
  const dateSpan = getDateSpan(widgetLocalStorage);

  const filteredLogs = logs
    ?.filter(log => filterByRegExp(log, filters))
    .filter(log => filterByDateSpan(log, dateSpan))
    .filter(log => filterByLevel(log, level));

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
            search={search}
            highlight={isLogHighlighted(log, search)}
          />
        ))}
      </LogsWrapper>
    </Container>
  );
}
