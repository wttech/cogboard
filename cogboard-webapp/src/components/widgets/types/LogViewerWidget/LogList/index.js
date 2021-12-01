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
import { getGridTemplate, filterByDateSpan } from './helpers';
import { getFilters } from '../Toolbar/FilterPicker/helpers';
import { getDateSpan } from '../Toolbar/DateRangePicker/helpers';

export default function LogList({ widgetLocalStorage, logs, template }) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);
  const dateSpan = getDateSpan(widgetLocalStorage);

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

  const filteredLogs = logs
    ?.filter(log => filterByRegExp(log, filters))
    .filter(log => filterByDateSpan(log, dateSpan));

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
          />
        ))}
      </LogsWrapper>
    </Container>
  );
}
