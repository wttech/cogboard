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
import { getFilters, getLevel } from '../Toolbar/FilterPicker/helpers';
import logLevels from '../logLevels';

export default function LogList({ widgetLocalStorage, logs, template }) {
  const theme = useTheme();
  const filters = getFilters(widgetLocalStorage);
  const level = getLevel(widgetLocalStorage);

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

  const filterByLevel = (log, level) => {
    const lowestLevel = logLevels.find(
      elem => elem.value.toLowerCase() === level.toLowerCase()
    );
    const logLevel = logLevels.find(
      elem => elem.value.toLowerCase() === log.type.toLowerCase()
    );
    return logLevel.level >= lowestLevel.level;
  };

  const prefilteredLogs = logs?.filter(log => filterByRegExp(log, filters));
  const filteredLogs = prefilteredLogs?.filter(log =>
    filterByLevel(log, level)
  );

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
