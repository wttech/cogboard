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
import { getFilters } from '../Toolbar/FilterPicker/helpers';

export default function LogList({ widgetLocalStorage, logs, template }) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);

  const filterByRegExp = (log, filters) => {
    let result = true;
    filters.forEach(({ regExp, checked }) => {
      if (checked) {
        let filterPassed = false;
        const regExpObj = new RegExp(regExp);
        const texts = [
          ...log.variableData.headers,
          ...log.variableData.description
        ];

        texts.forEach(text => {
          if (text.match(regExpObj)) {
            filterPassed = true;
          }
        });

        if (!filterPassed) {
          result = false;
        }
      }
    });
    return result;
  };

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
